package online.urarara.link.repository;

import online.urarara.link.entity.Widget;
import online.urarara.link.entity.WidgetCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WidgetRepository extends JpaRepository<Widget, Long> {
    List<Widget> findByCollection(WidgetCollection collection);
    List<Widget> findByCollectionAndIsActiveTrue(WidgetCollection collection);
}
