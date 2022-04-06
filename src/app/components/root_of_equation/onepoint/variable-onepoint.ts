export class VariableOnepoint {
  equation: string;
  x: number;
  fx: number;
  error: number;
  epsilon: number;
  iteration: number;
  constructor(
    equation: string,
    x: number,
    fx: number,
    error: number,
    epsilon: number,
    iteration: number
    ) {
      this.equation = equation;
      this.x=x;
      this.fx=fx;
      this.error=error;
      this.epsilon=epsilon;
      this.iteration = iteration;
    }
}
