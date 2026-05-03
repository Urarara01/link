# Enhance Design and Network Access

This plan outlines the steps to enable local network access and heavily refactor the Angular frontend design to match the rich "Obsidian Violet" templates using Vanilla CSS.

## User Review Required
Please review the proposed plan. Do you agree with using relative API URLs `http://${window.location.hostname}:8080` in Angular so that it automatically connects whether you use `localhost` or `192.168.18.27`?

## Proposed Changes

### Network & CORS Setup
- **[MODIFY] backend/CorsConfig.java**: Update `allowedOrigins` to use `allowedOriginPatterns` to allow `http://192.168.*.*:*` or specific local IP patterns, ensuring the backend accepts requests from devices on your local network.
- **[MODIFY] frontend/package.json**: Update the start script to `ng serve --host 0.0.0.0` so Angular listens on all network interfaces.
- **[MODIFY] frontend/api.service.ts**: Dynamically set the API URL based on `window.location.hostname` instead of hardcoding `localhost`.

### Global CSS Refactoring (Vanilla CSS)
- **[MODIFY] frontend/styles.css**: Extract the Tailwind utility equivalents from the HTML templates (like `primary-gradient`, `tonal-transition-right`, `glass-card`, etc.) and define them as reusable Vanilla CSS classes to strictly follow your rule of NOT using Tailwind.

### Dashboard Refactoring
- **[MODIFY] frontend/dashboard.component.html/.ts**: Implement the Bento Grid layout from `dashboard_principal/code.html` and `gestor_de_colecciones/code.html`. 
  - Add the sidebar navigation (visually).
  - Show collections as cards with placeholder images, tags, and counts.
  
### Collection Details & Custom Widget Interactions
- **[MODIFY] frontend/collection-detail.component.html/.ts**: Implement the layout from `vista_de_notas_y_n_meros/code.html`.
  - Add specific rendering logic (`*ngIf` or `@switch`) based on the `widget.type`.
  - **Links**: Render as clickable cards that open in a new tab (`target="_blank"`).
  - **Numbers/Notes**: Render with a copy-to-clipboard functionality (`navigator.clipboard.writeText`) and a small toast notification on success.

## Verification Plan
1. Restart the Spring Boot and Angular servers.
2. Access the app via `http://localhost:4200` and verify the UI looks like the templates.
3. Access the app via `http://192.168.18.27:4200` to verify LAN access works correctly.
4. Add a "LINK" widget and verify it opens in a new tab.
5. Add a "NUMBER" widget and verify clicking it copies the content to the clipboard.
