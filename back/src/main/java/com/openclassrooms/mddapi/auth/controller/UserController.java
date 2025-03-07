package com.openclassrooms.mddapi.auth.controller;

import com.openclassrooms.mddapi.auth.controller.dtos.CreateUpdateUserDto;
import com.openclassrooms.mddapi.auth.controller.presenter.UserPresenter;
import com.openclassrooms.mddapi.auth.domain.User;
import com.openclassrooms.mddapi.auth.services.CreateUserService;
import com.openclassrooms.mddapi.auth.services.UpdateUserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/user")
public class UserController {

    private final CreateUserService createUserService;

    private final UpdateUserService updateUserService;

    public UserController(CreateUserService createUserService, UpdateUserService updateUserService) {
        this.createUserService = createUserService;
        this.updateUserService = updateUserService;
    }

    @PostMapping("")
    public UserPresenter createUser(@RequestBody @Valid CreateUpdateUserDto createUserDto){

        User createdUser = this.createUserService.handle(createUserDto);

        return new UserPresenter(
                createdUser.getId(),
                createdUser.getUsername(),
                createdUser.getEmail(),
                createdUser.getDateCreated().toString(),
                createdUser.getDateUpdated().toString()
        );
    }

    @PatchMapping("")
    public UserPresenter updateUser(@RequestParam Long userId, @RequestBody @Valid CreateUpdateUserDto updateUserDto){
        User updatedUser  = this.updateUserService.handle(userId, updateUserDto);

        return new UserPresenter(
                updatedUser.getId(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getDateCreated().toString(),
                updatedUser.getDateUpdated().toString()
        );
    }
}
