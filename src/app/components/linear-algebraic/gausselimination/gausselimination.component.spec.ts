import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GausseliminationComponent } from './gausselimination.component';

describe('GausseliminationComponent', () => {
  let component: GausseliminationComponent;
  let fixture: ComponentFixture<GausseliminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GausseliminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GausseliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
