import { Test, TestingModule } from '@nestjs/testing';
import { MosaicsService } from './mosaics.service';

describe('MosaicsService', () => {
  let service: MosaicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MosaicsService],
    }).compile();

    service = module.get<MosaicsService>(MosaicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
