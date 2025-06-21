import { Test, TestingModule } from '@nestjs/testing';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';

describe('ActorController', () => {
  let controller: ActorController;
  let service: ActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [
        {
          provide: ActorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByName: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActorController>(ActorController);
    service = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service defined', () => {
    expect(service).toBeDefined();
  });
});
