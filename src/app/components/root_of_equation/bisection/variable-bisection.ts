export class VariableBisection {
  equation: string;
  xl: number;
  xr: number;
  xm: number;
  error: number;
  epsilon: number;
  iteration: number;
  constructor(
    equation: string,
    xl: number,
    xr: number,
    xm: number,
    error: number,
    epsilon: number,
    iteration: number
    ) {
      this.equation = equation;
      this.xl=xl;
      this.xr=xr;
      this.xm=xm;
      this.error=error;
      this.epsilon=epsilon;
      this.iteration = iteration;
    }
}
