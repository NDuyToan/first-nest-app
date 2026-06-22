import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  username: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsInt()
  @Min(1, { message: 'Tuổi phải lớn hơn hoặc bằng 1' })
  @Max(120, { message: 'Tuổi phải nhỏ hơn hoặc bằng 120' })
  age: number;
}
