export class VariableFalsepositon {
  equation: string;
  xl: number;
  xr: number;
  x1: number;
  error: number;
  epsilon: number;
  iteration: number;
  constructor(
    equation: string,
    xl: number,
    xr: number,
    x1: number,
    error: number,
    epsilon: number,
    iteration: number
    ) {
      this.equation = equation;
      this.xl=xl;
      this.xr=xr;
      this.x1=x1;
      this.error=error;
      this.epsilon=epsilon;
      this.iteration = iteration;
    }
}

