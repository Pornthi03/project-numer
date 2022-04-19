import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussseidelComponent } from './gaussseidel.component';

describe('GaussseidelComponent', () => {
  let component: GaussseidelComponent;
  let fixture: ComponentFixture<GaussseidelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussseidelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussseidelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
