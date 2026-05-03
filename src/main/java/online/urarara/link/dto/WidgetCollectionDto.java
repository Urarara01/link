package online.urarara.link.dto;

import lombok.Data;

@Data
public class WidgetCollectionDto {
    private Long id;
    private String name;
    private String description;
    private Long ownerId;
}
