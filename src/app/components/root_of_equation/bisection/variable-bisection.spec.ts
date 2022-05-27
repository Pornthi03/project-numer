import { VariableBisection } from './variable-bisection';

describe('VariableBisection', () => {
  it('should create an instance', () => {
    expect(new VariableBisection("x^4-13",1.75,2,0,0,0,0)).toBeTruthy();
  });
});
