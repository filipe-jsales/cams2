import { Test, TestingModule } from '@nestjs/testing';
import { CamsService } from './cams.service';

describe('CamsService', () => {
  let service: CamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamsService],
    }).compile();

    service = module.get<CamsService>(CamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
