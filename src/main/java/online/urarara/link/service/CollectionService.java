package online.urarara.link.service;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.WidgetCollectionDto;
import online.urarara.link.entity.AppUser;
import online.urarara.link.entity.WidgetCollection;
import online.urarara.link.repository.UserRepository;
import online.urarara.link.repository.WidgetCollectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CollectionService {

    private final WidgetCollectionRepository collectionRepository;
    private final UserRepository userRepository;

    public List<WidgetCollectionDto> getCollectionsByUser(Long userId) {
        AppUser owner = userRepository.findById(userId).orElseThrow();
        return collectionRepository.findByOwner(owner).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public WidgetCollectionDto createCollection(WidgetCollectionDto dto) {
        AppUser owner = userRepository.findById(dto.getOwnerId()).orElseThrow();
        
        WidgetCollection collection = new WidgetCollection();
        collection.setName(dto.getName());
        collection.setDescription(dto.getDescription());
        collection.setOwner(owner);

        WidgetCollection saved = collectionRepository.save(collection);
        return mapToDto(saved);
    }

    private WidgetCollectionDto mapToDto(WidgetCollection collection) {
        WidgetCollectionDto dto = new WidgetCollectionDto();
        dto.setId(collection.getId());
        dto.setName(collection.getName());
        dto.setDescription(collection.getDescription());
        dto.setOwnerId(collection.getOwner().getId());
        return dto;
    }
}
