import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from './DTO';

let users = [];
@Controller('/users')
export class UserController {
  @Post('create-user')
  addUser(@Body() createUserDto: UserDTO) {
    users.push(createUserDto);
    return {
      message: 'User added',
      status: 'Success',
    };
  }

  @Get()
  getUsers() {
    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return users.find((user) => +user.id === +id);
  }

  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() updateUserDto: UserDTO) {
    const userIndex = users.findIndex((user) => +user.id === +id);
    console.log(userIndex);
    
    if(userIndex < 0) {
        return {
            message: "User not found", status: "Failed"
        }
    }
    users[userIndex] = updateUserDto;
    return {
      message: 'User details updated',
      status: 'Success',
    };
  }

  @Delete(":id")
  deleteUserById(@Param("id") id: number) {
    return users.filter(user => +user.id !== +id);
  }
}
