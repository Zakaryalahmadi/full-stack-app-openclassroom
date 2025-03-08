package com.openclassrooms.mddapi.auth.controller;

import com.openclassrooms.mddapi.auth.controller.dtos.CreateUpdateUserDto;
import com.openclassrooms.mddapi.auth.controller.dtos.LoginDto;
import com.openclassrooms.mddapi.auth.controller.presenter.UserPresenter;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserWithToken;
import com.openclassrooms.mddapi.auth.services.CreateUserService;
import com.openclassrooms.mddapi.auth.services.LoginService;
import com.openclassrooms.mddapi.auth.services.UpdateUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/auth/")
public class UserController {

    private final CreateUserService createUserService;
    private final UpdateUserService updateUserService;
    private final LoginService loginService;

    public UserController(CreateUserService createUserService, UpdateUserService updateUserService, LoginService loginService) {
        this.createUserService = createUserService;
        this.updateUserService = updateUserService;
        this.loginService = loginService;
    }

    @PostMapping("register")
    public UserPresenter register(@RequestBody @Valid CreateUpdateUserDto createUserDto){

        UserWithToken createdUser = this.createUserService.handle(createUserDto);

        return UserPresenter.builder()
                .id(createdUser.user().getId())
                .username(createdUser.user().getUsername())
                .email(createdUser.user().getEmail())
                .token(createdUser.token())
                .dateCreated(createdUser.user().getDateCreated().toString())
                .build();
    }

    @PostMapping("login")
    public UserPresenter login(@RequestBody LoginDto loginDto){
        UserWithToken user = this.loginService.handle(loginDto);

        return UserPresenter.builder()
                .id(user.user().getId())
                .username(user.user().getUsername())
                .email(user.user().getEmail())
                .token(user.token())
                .dateCreated(user.user().getDateCreated().toString())
                .build();
    }

    @PatchMapping("user/{userId}")
    public UserPresenter updateUser(@PathVariable Long userId, @RequestBody @Valid CreateUpdateUserDto updateUserDto){
        User updatedUser  = this.updateUserService.handle(userId, updateUserDto);

        return UserPresenter.builder()
                .id(updatedUser.getId())
                .username(updatedUser.getUsername())
                .email(updatedUser.getEmail())
                .dateCreated(updatedUser.getDateCreated().toString())
                .build();
    }
}
