import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService, Widget } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './collection-detail.component.html'
})
export class CollectionDetailComponent implements OnInit {
  collectionId!: number;
  widgets: Widget[] = [];

  newWidgetType = 'LINK';
  newWidgetContent = '';
  newWidgetTimer = 'INDEFINITE';

  showToast = false;
  toastMessage = '';

  // Track visibility for KEY widgets
  visibleKeys: { [key: number]: boolean } = {};

  widgetTypes = [
    { value: 'LINK', label: '🔗 Link' },
    { value: 'SIMPLE_TEXT', label: '📝 Texto Simple' },
    { value: 'QUICK_NOTE', label: '📌 Nota Rápida' },
    { value: 'NUMBER', label: '🔢 Número' },
    { value: 'VIDEO', label: '🎬 Video' },
    { value: 'IMAGE', label: '🖼️ Imagen' },
    { value: 'TASK_LIST', label: '✅ Lista de Tareas' },
    { value: 'CARD', label: '🗂️ Tarjeta' },
    { value: 'KEY', label: '🔑 Key' },
  ];

  timerTypes = [
    { value: 'INDEFINITE', label: '♾️ Indefinido' },
    { value: 'TEMPORARY', label: '⏳ Temporal' },
    { value: 'SINGLE_USE', label: '1️⃣ Un Solo Uso' }
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.collectionId = +id;
        this.loadWidgets();
      }
    });
  }

  loadWidgets() {
    this.apiService.getWidgetsByCollection(this.collectionId).subscribe({
      next: (data) => this.widgets = data,
      error: (err) => console.error('Failed to load widgets', err)
    });
  }

  createWidget() {
    if (!this.newWidgetContent.trim()) return;

    const contentPayload = { data: this.newWidgetContent };

    this.apiService.createWidget({
      collectionId: this.collectionId,
      type: this.newWidgetType,
      timerType: this.newWidgetTimer,
      content: contentPayload,
      isActive: true
    }).subscribe({
      next: (newWidget) => {
        this.widgets.push(newWidget);
        this.newWidgetContent = '';
      },
      error: (err) => console.error('Failed to create widget', err)
    });
  }

  /** Extract the display string from the widget content JSON */
  getDisplayContent(widget: Widget): string {
    if (!widget.content) return '';
    if (typeof widget.content === 'string') return widget.content;
    return widget.content.data || JSON.stringify(widget.content);
  }

  /** Extract a domain from URL-like content */
  getDomain(widget: Widget): string {
    const content = this.getDisplayContent(widget);
    try {
      const url = new URL(content.startsWith('http') ? content : `https://${content}`);
      return url.hostname;
    } catch {
      return '';
    }
  }

  /** Open link in a new tab */
  openLink(widget: Widget) {
    const content = this.getDisplayContent(widget);
    if (!content) return;
    const url = content.startsWith('http') ? content : `https://${content}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /** Copy content to clipboard and show toast */
  copyToClipboard(widget: Widget) {
    const content = this.getDisplayContent(widget);
    if (!content) return;

    navigator.clipboard.writeText(content).then(() => {
      this.toastMessage = `"${content.length > 40 ? content.substring(0, 40) + '...' : content}" copiado al portapapeles`;
      this.showToast = true;
      setTimeout(() => { this.showToast = false; }, 2500);
    }).catch(err => {
      console.error('Clipboard copy failed', err);
    });
  }

  /** Toggle visibility for a KEY widget */
  toggleKeyVisibility(widgetId: number) {
    this.visibleKeys[widgetId] = !this.visibleKeys[widgetId];
  }

  /** Dynamic content label based on widget type */
  getContentLabel(): string {
    switch (this.newWidgetType) {
      case 'LINK': return 'URL';
      case 'NUMBER': return 'Número o Valor';
      case 'VIDEO': return 'URL del Video';
      case 'IMAGE': return 'URL de la Imagen';
      case 'SIMPLE_TEXT': return 'Texto';
      case 'QUICK_NOTE': return 'Nota';
      case 'TASK_LIST': return 'Tareas';
      case 'KEY': return 'Key';
      case 'CARD': return 'Card';
      default: return 'Contenido';
    }
  }

  /** Dynamic placeholder based on widget type */
  getContentPlaceholder(): string {
    switch (this.newWidgetType) {
      case 'LINK': return 'https://ejemplo.com';
      case 'NUMBER': return '12345 o +52 555 123 4567';
      case 'VIDEO': return 'https://youtube.com/watch?v=...';
      case 'IMAGE': return 'https://imgur.com/mi-imagen.png';
      case 'SIMPLE_TEXT': return 'Escribe tu texto aquí...';
      case 'QUICK_NOTE': return 'Escribe tu nota rápida...';
      case 'TASK_LIST': return 'Tarea 1, Tarea 2, Tarea 3...';
      case 'KEY': return 'Escribe tu key aquí...';
      case 'CARD': return 'xxxxxxxxxxxxxxxx|xx|xxxx|xxx';
      default: return 'Contenido del widget...';
    }
  }

  /** Parse card data from format: cardNumber|month|year|cvv, cardNumber month year cvv, cardNumber,month,year,cvv, or cardNumber/month/year/cvv */
  parseCardData(content: string): { cardNumber: string; expiry: string; cvv: string } | null {
    let parts: string[] | null = null;
    if (content.includes('|')) {
      parts = content.split('|');
    } else if (content.includes(',')) {
      parts = content.split(',');
    } else if (content.includes('/')) {
      parts = content.split('/');
    } else if (content.includes(' ')) {
      parts = content.split(' ');
    }

    if (!parts || parts.length !== 4) return null;

    const cardNumber = parts[0].replace(/\s+/g, '').trim();
    const month = parts[1].trim();
    const year = parts[2].trim();
    const cvv = parts[3].trim();

    // Validate that they are numbers
    if (!/^\d+$/.test(cardNumber) || !/^\d+$/.test(month) || !/^\d+$/.test(year) || !/^\d+$/.test(cvv)) {
      return null;
    }

    return {
      cardNumber,
      expiry: `${month}/${year}`,
      cvv
    };
  }

  /** Get card number from widget */
  getCardNumber(widget: Widget): string {
    const content = this.getDisplayContent(widget);
    const cardData = this.parseCardData(content);
    return cardData ? cardData.cardNumber : '';
  }

  /** Get expiry date from widget */
  getCardExpiry(widget: Widget): string {
    const content = this.getDisplayContent(widget);
    const cardData = this.parseCardData(content);
    return cardData ? cardData.expiry : '';
  }

  /** Get CVV from widget */
  getCardCVV(widget: Widget): string {
    const content = this.getDisplayContent(widget);
    const cardData = this.parseCardData(content);
    return cardData ? cardData.cvv : '';
  }

  /** Check if widget content is a valid card format */
  isValidCardFormat(widget: Widget): boolean {
    const content = this.getDisplayContent(widget);
    return this.parseCardData(content) !== null;
  }

  /** Copy specific card field to clipboard */
  copyCardField(field: string, value: string) {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      const fieldLabel = field === 'card' ? 'Tarjeta' : field === 'expiry' ? 'Fecha' : 'CVV';
      this.toastMessage = `${fieldLabel} copiado al portapapeles`;
      this.showToast = true;
      setTimeout(() => { this.showToast = false; }, 2500);
    }).catch(err => {
      console.error('Clipboard copy failed', err);
    });
  }
}
