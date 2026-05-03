package online.urarara.link.config;

import online.urarara.link.entity.AppUser;
import online.urarara.link.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                AppUser testUser = new AppUser();
                testUser.setUsername("testuser");
                testUser.setEmail("test@example.com");
                testUser.setPasswordHash("hashed_password_placeholder");
                userRepository.save(testUser);
                System.out.println("Test user created with ID 1");
            }
        };
    }
}
