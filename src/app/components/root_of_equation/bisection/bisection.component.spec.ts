import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule, By } from '@angular/platform-browser';

import { BisectionComponent } from './bisection.component';

describe('BisectionComponent', () => {
  let comp: BisectionComponent;
  let fixture: ComponentFixture<BisectionComponent>;
  let de: DebugElement;
  let el: HTMLLIElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisectionComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(BisectionComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should set cal true', () => {
    comp.bisectiongroup.controls['equation'].setValue('x^4-13');
    comp.bisectiongroup.controls['xl'].setValue('1.75');
    comp.bisectiongroup.controls['xr'].setValue('2.0');
    comp.bisectiongroup.controls['epsilon'].setValue('0.000001');
    comp.cal(comp.bisectiongroup.value,comp.bisectiongroup);
    expect(comp.cal).toBeTruthy();
  })


  it('form should be invalid', async() => {
    await comp.bisectiongroup.controls['equation'].setValue('');
    await comp.bisectiongroup.controls['xl'].setValue('');
    await comp.bisectiongroup.controls['xr'].setValue('');
    await comp.bisectiongroup.controls['epsilon'].setValue('');
    expect(comp.bisectiongroup.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    await comp.bisectiongroup.controls['equation'].setValue('x^4-13');
    await comp.bisectiongroup.controls['xl'].setValue('1.75');
    await comp.bisectiongroup.controls['xr'].setValue('2.0');
    await comp.bisectiongroup.controls['epsilon'].setValue('0.000001');
    expect(comp.bisectiongroup.valid).toBeTruthy();
  });
});
