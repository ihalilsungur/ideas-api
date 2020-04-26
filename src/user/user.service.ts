import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll():Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async userLogin(data: UserDTO) :Promise<UserRO>{
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async userRegister(data: UserDTO):Promise<UserRO> {
    //ilk olarak data'nin içindeki username alalim.
    const { username } = data;
    //daha sonra gelen username daha once veritanında var mı yok mu
    let user = await this.userRepository.findOne({ where: { username } });
    //eger bu username daha once kayıt olmuş ise uyarı mesajı verelim
    if (user) {
      throw new HttpException('User already existis', HttpStatus.BAD_REQUEST);
    }
    //eger bu username veritabanında  yok ise bunu oluştur
    user = await this.userRepository.create(data);
    //daha sonra bunu veritanına kayıt et.
    await this.userRepository.save(user);
    // en son olarak bu kayıtı bana donder.
    return user.toResponseObject();
  }
}
