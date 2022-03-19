import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BisectionComponent } from './components/root_of_equation/bisection/bisection.component';
import { FalsepositionComponent } from './components/root_of_equation/falseposition/falseposition.component';
import { OnepointComponent } from './components/root_of_equation/onepoint/onepoint.component';
import { NewtonraphsonComponent } from './components/root_of_equation/newtonraphson/newtonraphson.component';
import { SecantComponent } from './components/root_of_equation/secant/secant.component';

const routes: Routes = [
  {path: 'bisection',component:BisectionComponent},
  {path: 'falseposition',component:FalsepositionComponent},
  {path: 'onepoint',component:OnepointComponent},
  {path: 'newtonraphson',component:NewtonraphsonComponent},
  {path: 'secant',component:SecantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
