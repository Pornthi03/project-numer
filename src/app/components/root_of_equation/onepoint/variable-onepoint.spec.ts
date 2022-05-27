import { VariableOnepoint } from './variable-onepoint';

describe('VariableOnepoint', () => {
  it('should create an instance', () => {
    expect(new VariableOnepoint("1/4-x/2",0,0,0,0,0)).toBeTruthy();
  });
});
