import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';

describe('ActorService', () => {
  let service: ActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            count: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
