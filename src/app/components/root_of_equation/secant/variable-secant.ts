export class VariableSecant {
  equation: string;
  x: number;
  xi: number;
  fx: number;
  fxi: number;
  error: number;
  epsilon: number;
  iteration: number;
  constructor(
    equation: string,
    x: number,
    xi: number,
    fx: number,
    fxi: number,
    error: number,
    epsilon: number,
    iteration: number
    ) {
      this.equation = equation;
      this.x=x;
      this.xi=xi;
      this.fx=fx;
      this.fxi=fxi;
      this.error=error;
      this.epsilon=epsilon;
      this.iteration = iteration;
    }
}
