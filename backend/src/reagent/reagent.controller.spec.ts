import { Test, TestingModule } from '@nestjs/testing';
import { ReagentController } from './reagent.controller';
import { ReagentService } from './reagent.service';

describe('ReagentController', () => {
  let controller: ReagentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReagentController],
      providers: [ReagentService],
    }).compile();

    controller = module.get<ReagentController>(ReagentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
