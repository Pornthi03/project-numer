import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BisectionComponent } from './components/root_of_equation/bisection/bisection.component';
import { FalsepositionComponent } from './components/root_of_equation/falseposition/falseposition.component';
import { OnepointComponent } from './components/root_of_equation/onepoint/onepoint.component';
import { NewtonraphsonComponent } from './components/root_of_equation/newtonraphson/newtonraphson.component';
import { SecantComponent } from './components/root_of_equation/secant/secant.component';
import { CramerComponent } from './components/linear-algebraic/cramer/cramer.component';
import { GausseliminationComponent } from './components/linear-algebraic/gausselimination/gausselimination.component';
import { GaussjordanComponent } from './components/linear-algebraic/gaussjordan/gaussjordan.component';
import { LUComponent } from './components/linear-algebraic/lu/lu.component';
import { CholeskyComponent } from './components/linear-algebraic/cholesky/cholesky.component';
import { JacobiComponent } from './components/linear-algebraic/jacobi/jacobi.component';
import { GaussseidelComponent } from './components/linear-algebraic/gaussseidel/gaussseidel.component';
import { ConjugateComponent } from './components/linear-algebraic/conjugate/conjugate.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '',pathMatch:'full', redirectTo: 'home'},
  {path: 'bisection',component:BisectionComponent},
  {path: 'falseposition',component:FalsepositionComponent},
  {path: 'onepoint',component:OnepointComponent},
  {path: 'newtonraphson',component:NewtonraphsonComponent},
  {path: 'secant',component:SecantComponent},
  {path: 'cramer',component:CramerComponent},
  {path: 'gausselimination',component:GausseliminationComponent},
  {path: 'gaussjordan',component:GaussjordanComponent},
  {path: 'LU',component:LUComponent},
  {path: 'cholesky',component:CholeskyComponent},
  {path: 'jacobi',component:JacobiComponent},
  {path: 'seidel',component:GaussseidelComponent},
  {path: 'conjugate',component:ConjugateComponent},
  {path: 'home',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
