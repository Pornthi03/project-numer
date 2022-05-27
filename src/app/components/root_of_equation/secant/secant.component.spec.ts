import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SecantComponent } from './secant.component';

describe('SecantComponent', () => {
  let component: SecantComponent;
  let fixture: ComponentFixture<SecantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecantComponent ],
      imports:[FormsModule,
        ReactiveFormsModule,]
    })
    .compileComponents();
  });

});
