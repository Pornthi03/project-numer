import { VariableSecant } from './variable-secant';

describe('VariableSecant', () => {
  it('should create an instance', () => {
    expect(new VariableSecant("x^2-7",2,2.75,0,0,0,0,0)).toBeTruthy();
  });
});
