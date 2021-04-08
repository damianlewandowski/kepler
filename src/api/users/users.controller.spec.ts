import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Id } from 'types';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,  {
        provide: getRepositoryToken(User),
        useValue: {},
      }],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return its id as a promise', async () => {
      const result = new Promise<Id>((res, rej) => res({ id: 1 }));
      jest.spyOn(usersService, 'create').mockImplementation(() => result);

      const createUserDto: CreateUserDto = { email: 'somemail@gmail.com', password: 'somepassword123' }
      
      expect((await controller.create(createUserDto)).id).toBe((await result).id);
    });
  })
})
