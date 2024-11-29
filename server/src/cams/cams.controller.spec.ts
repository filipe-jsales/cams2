import { Test, TestingModule } from '@nestjs/testing';
import { CamsController } from './cams.controller';
import { CamsService } from './cams.service';

describe('CamsController', () => {
  let controller: CamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamsController],
      providers: [CamsService],
    }).compile();

    controller = module.get<CamsController>(CamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
