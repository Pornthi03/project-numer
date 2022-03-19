import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussjordanComponent } from './gaussjordan.component';

describe('GaussjordanComponent', () => {
  let component: GaussjordanComponent;
  let fixture: ComponentFixture<GaussjordanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussjordanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussjordanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
