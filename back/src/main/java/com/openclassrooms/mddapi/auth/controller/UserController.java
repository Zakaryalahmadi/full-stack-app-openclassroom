package com.openclassrooms.mddapi.auth.controller;

import com.openclassrooms.mddapi.auth.controller.dtos.CreateUserDto;
import com.openclassrooms.mddapi.auth.controller.dtos.LoginDto;
import com.openclassrooms.mddapi.auth.controller.dtos.UpdateUserDto;
import com.openclassrooms.mddapi.auth.controller.presenter.UserPresenter;
import com.openclassrooms.mddapi.auth.controller.presenter.UserPresenterWithToken;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.domain.UserWithToken;
import com.openclassrooms.mddapi.auth.services.CreateUserService;
import com.openclassrooms.mddapi.auth.services.GetCurrentUserServiceViaToken;
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
    private final GetCurrentUserServiceViaToken getCurrentUserServiceViaToken;

    public UserController(CreateUserService createUserService,
            UpdateUserService updateUserService,
            LoginService loginService,
            GetCurrentUserServiceViaToken getCurrentUserServiceViaToken) {
        this.createUserService = createUserService;
        this.updateUserService = updateUserService;
        this.loginService = loginService;
        this.getCurrentUserServiceViaToken = getCurrentUserServiceViaToken;
    }

    @PostMapping("register")
    public UserPresenterWithToken register(@RequestBody @Valid CreateUserDto createUserDto) {

        UserWithToken createdUser = this.createUserService.handle(createUserDto);

        return UserPresenterWithToken.fromDomain(createdUser);
    }

    @PostMapping("login")
    public UserPresenterWithToken login(@RequestBody LoginDto loginDto) {
        UserWithToken user = this.loginService.handle(loginDto);

        return UserPresenterWithToken.fromDomain(user);
    }

    @GetMapping("me")
    public UserPresenter getCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        User user = this.getCurrentUserServiceViaToken.handle(token);

        return UserPresenter.fromDomain(user);

    }

    @PatchMapping("me")
    public UserPresenter updateUser(@RequestHeader("Authorization") String authorizationHeader,
            @RequestBody @Valid UpdateUserDto updateUserDto) {
        String token = authorizationHeader.substring(7);

        User updatedUser = this.updateUserService.handle(token, updateUserDto);

        return UserPresenter.fromDomain(updatedUser);
    }
}
