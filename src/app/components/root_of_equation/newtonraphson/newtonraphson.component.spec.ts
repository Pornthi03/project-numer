import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewtonraphsonComponent } from './newtonraphson.component';

describe('NewtonraphsonComponent', () => {
  let component: NewtonraphsonComponent;
  let fixture: ComponentFixture<NewtonraphsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtonraphsonComponent ],
      imports:[FormsModule,
        ReactiveFormsModule,]
    })
    .compileComponents();
  });

});
