import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
