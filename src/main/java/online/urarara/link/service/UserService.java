package online.urarara.link.service;

import lombok.RequiredArgsConstructor;
import online.urarara.link.dto.UserDto;
import online.urarara.link.entity.AppUser;
import online.urarara.link.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id).map(this::mapToDto).orElse(null);
    }

    public UserDto createUser(AppUser user) {
        // In a real app, hash password here
        AppUser savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    private UserDto mapToDto(AppUser user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
