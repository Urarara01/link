package online.urarara.link.controller;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.UserDto;
import online.urarara.link.entity.AppUser;
import online.urarara.link.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody AppUser user) {
        // In a real scenario, use a specific CreateUserDto instead of AppUser entity
        return ResponseEntity.ok(userService.createUser(user));
    }
}
