import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LUComponent } from './lu.component';

describe('LUComponent', () => {
  let component: LUComponent;
  let fixture: ComponentFixture<LUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
