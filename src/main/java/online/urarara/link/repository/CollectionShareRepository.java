package online.urarara.link.repository;

import online.urarara.link.entity.AppUser;
import online.urarara.link.entity.CollectionShare;
import online.urarara.link.entity.WidgetCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionShareRepository extends JpaRepository<CollectionShare, Long> {
    List<CollectionShare> findByCollection(WidgetCollection collection);
    List<CollectionShare> findBySharedUser(AppUser user);
}
