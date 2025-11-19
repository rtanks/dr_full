import { Test, TestingModule } from '@nestjs/testing';
import { ReagentService } from './reagent.service';

describe('ReagentService', () => {
  let service: ReagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReagentService],
    }).compile();

    service = module.get<ReagentService>(ReagentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
