package online.urarara.link.repository;

import online.urarara.link.entity.AppUser;
import online.urarara.link.entity.WidgetCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WidgetCollectionRepository extends JpaRepository<WidgetCollection, Long> {
    List<WidgetCollection> findByOwner(AppUser owner);
}
