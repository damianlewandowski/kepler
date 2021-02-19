import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @MinLength(3)
  @MaxLength(256)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  readonly password: string;
}