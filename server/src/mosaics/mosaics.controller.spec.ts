import { Test, TestingModule } from '@nestjs/testing';
import { MosaicsController } from './mosaics.controller';
import { MosaicsService } from './mosaics.service';

describe('MosaicsController', () => {
  let controller: MosaicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MosaicsController],
      providers: [MosaicsService],
    }).compile();

    controller = module.get<MosaicsController>(MosaicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
