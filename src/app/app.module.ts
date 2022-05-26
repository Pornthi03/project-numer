import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MathjaxModule } from 'mathjax-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
//Angular Material Components
import { AppComponent } from './app.component';
import { BisectionComponent } from './components/root_of_equation/bisection/bisection.component';
import { FalsepositionComponent } from './components/root_of_equation/falseposition/falseposition.component';
import { OnepointComponent } from './components/root_of_equation/onepoint/onepoint.component';
import { NewtonraphsonComponent } from './components/root_of_equation/newtonraphson/newtonraphson.component';
import { SecantComponent } from './components/root_of_equation/secant/secant.component';
import { CramerComponent } from './components/linear-algebraic/cramer/cramer.component';
import { GausseliminationComponent } from './components/linear-algebraic/gausselimination/gausselimination.component';
import { GaussjordanComponent } from './components/linear-algebraic/gaussjordan/gaussjordan.component';
import { LinechartComponent } from './components/root_of_equation/linechart/linechart.component';
import { HomeComponent } from './components/home/home.component';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { MatrixComponent } from './components/matrix/matrix.component';
import { LUComponent } from './components/linear-algebraic/lu/lu.component';
import { CholeskyComponent } from './components/linear-algebraic/cholesky/cholesky.component';
import { JacobiComponent } from './components/linear-algebraic/jacobi/jacobi.component';
import { GaussseidelComponent } from './components/linear-algebraic/gaussseidel/gaussseidel.component';
import { ConjugateComponent } from './components/linear-algebraic/conjugate/conjugate.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    BisectionComponent,
    FalsepositionComponent,
    OnepointComponent,
    NewtonraphsonComponent,
    SecantComponent,
    CramerComponent,
    GausseliminationComponent,
    GaussjordanComponent,
    LinechartComponent,
    HomeComponent,
    MatrixComponent,
    LUComponent,
    CholeskyComponent,
    JacobiComponent,
    GaussseidelComponent,
    ConjugateComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
