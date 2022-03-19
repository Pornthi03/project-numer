import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalsepositionComponent } from './falseposition.component';

describe('FalsepositionComponent', () => {
  let component: FalsepositionComponent;
  let fixture: ComponentFixture<FalsepositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalsepositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalsepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
