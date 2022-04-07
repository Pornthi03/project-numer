export class VariableNewtonraphon {
  equation: string;
  x: number;
  fx: number;
  dfx: number;
  error: number;
  epsilon: number;
  iteration: number;
  constructor(
    equation: string,
    x: number,
    fx: number,
    dfx: number,
    error: number,
    epsilon: number,
    iteration: number
    ) {
      this.equation = equation;
      this.x=x;
      this.fx=fx;
      this.dfx=dfx;
      this.error=error;
      this.epsilon=epsilon;
      this.iteration = iteration;
    }
}
