import { VariableFalsepositon } from './variable-falsepositon';

describe('VariableFalsepositon', () => {
  it('should create an instance', () => {
    expect(new VariableFalsepositon("43x-1",0.02,0.03,0,0,0,0)).toBeTruthy();
  });
});
