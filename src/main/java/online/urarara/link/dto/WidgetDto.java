package online.urarara.link.dto;

import lombok.Data;
import online.urarara.link.entity.TimerType;
import online.urarara.link.entity.WidgetType;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class WidgetDto {
    private Long id;
    private Long collectionId;
    private WidgetType type;
    private TimerType timerType;
    private LocalDateTime expirationDate;
    private boolean isActive;
    private Map<String, Object> content; // JSON object
}
