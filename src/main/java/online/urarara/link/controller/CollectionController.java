package online.urarara.link.controller;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.WidgetCollectionDto;
import online.urarara.link.service.CollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WidgetCollectionDto>> getCollectionsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(collectionService.getCollectionsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<WidgetCollectionDto> createCollection(@RequestBody WidgetCollectionDto dto) {
        return ResponseEntity.ok(collectionService.createCollection(dto));
    }
}
