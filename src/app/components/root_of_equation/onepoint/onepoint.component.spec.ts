import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OnepointComponent } from './onepoint.component';

describe('OnepointComponent', () => {
  let component: OnepointComponent;
  let fixture: ComponentFixture<OnepointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnepointComponent ],
      imports:[FormsModule,
        ReactiveFormsModule,]
    })
    .compileComponents();
  });

});
