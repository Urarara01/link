package online.urarara.link.service;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.WidgetDto;
import online.urarara.link.entity.Widget;
import online.urarara.link.entity.WidgetCollection;
import online.urarara.link.repository.WidgetCollectionRepository;
import online.urarara.link.repository.WidgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WidgetService {

    private final WidgetRepository widgetRepository;
    private final WidgetCollectionRepository collectionRepository;

    public List<WidgetDto> getWidgetsByCollection(Long collectionId) {
        WidgetCollection collection = collectionRepository.findById(collectionId).orElseThrow();
        return widgetRepository.findByCollectionAndIsActiveTrue(collection).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public WidgetDto createWidget(WidgetDto dto) {
        WidgetCollection collection = collectionRepository.findById(dto.getCollectionId()).orElseThrow();
        
        Widget widget = new Widget();
        widget.setCollection(collection);
        widget.setType(dto.getType());
        widget.setTimerType(dto.getTimerType());
        widget.setExpirationDate(dto.getExpirationDate());
        widget.setActive(true);
        widget.setContent(dto.getContent());

        Widget saved = widgetRepository.save(widget);
        return mapToDto(saved);
    }

    public void deleteWidget(Long widgetId) {
        widgetRepository.deleteById(widgetId);
    }

    private WidgetDto mapToDto(Widget widget) {
        WidgetDto dto = new WidgetDto();
        dto.setId(widget.getId());
        dto.setCollectionId(widget.getCollection().getId());
        dto.setType(widget.getType());
        dto.setTimerType(widget.getTimerType());
        dto.setExpirationDate(widget.getExpirationDate());
        dto.setActive(widget.isActive());
        dto.setContent(widget.getContent());
        return dto;
    }
}
