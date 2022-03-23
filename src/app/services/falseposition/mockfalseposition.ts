import { VariableFalsepositon } from "src/app/components/root_of_equation/falseposition/variable-falsepositon";

export class Mockfalseposition {
  public static mfalsepositionn: VariableFalsepositon[]=[
    {
      equation : "43x-1",
      xl : 0.02,
      xr : 0.03,
      x1 : 0,
      error : 0,
      epsilon: Math.pow(10,-6),
      iteration: 1
    }
  ];
}
