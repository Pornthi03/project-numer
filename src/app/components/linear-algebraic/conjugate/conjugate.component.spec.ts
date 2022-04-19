import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugateComponent } from './conjugate.component';

describe('ConjugateComponent', () => {
  let component: ConjugateComponent;
  let fixture: ComponentFixture<ConjugateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
