import { VariableBisection } from "../../components/root_of_equation/bisection/variable-bisection";

export class Mockbisection {
  public static mbisection: VariableBisection[]=[
    {
      equation : "x^4-13",
      xl : 1.5,
      xr : 2.0,
      xm : 0,
      error : 0,
      epsilon: Math.pow(10,-6),
      iteration: 0
    }
  ];
}
