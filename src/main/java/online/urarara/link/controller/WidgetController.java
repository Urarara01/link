package online.urarara.link.controller;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.WidgetDto;
import online.urarara.link.service.WidgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/widgets")
@RequiredArgsConstructor
public class WidgetController {

    private final WidgetService widgetService;

    @GetMapping("/collection/{collectionId}")
    public ResponseEntity<List<WidgetDto>> getWidgetsByCollection(@PathVariable Long collectionId) {
        return ResponseEntity.ok(widgetService.getWidgetsByCollection(collectionId));
    }

    @PostMapping
    public ResponseEntity<WidgetDto> createWidget(@RequestBody WidgetDto dto) {
        return ResponseEntity.ok(widgetService.createWidget(dto));
    }
}
