import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule, By } from '@angular/platform-browser';

import { FalsepositionComponent } from './falseposition.component';

describe('FalsepositionComponent', () => {
  let comp: FalsepositionComponent;
  let fixture: ComponentFixture<FalsepositionComponent>;
  let de: DebugElement;
  let el: HTMLLIElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalsepositionComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatCardModule]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FalsepositionComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should set cal true', () => {
    comp.falsepositiongroup.controls['equation'].setValue('x^4-13');
    comp.falsepositiongroup.controls['xl'].setValue('1.75');
    comp.falsepositiongroup.controls['xr'].setValue('2.0');
    comp.falsepositiongroup.controls['epsilon'].setValue('0.000001');
    comp.cal(comp.falsepositiongroup.value,comp.falsepositiongroup);
    expect(comp.cal).toBeTruthy();
  })


  it('form should be invalid', async() => {
    await comp.falsepositiongroup.controls['equation'].setValue('');
    await comp.falsepositiongroup.controls['xl'].setValue('');
    await comp.falsepositiongroup.controls['xr'].setValue('');
    await comp.falsepositiongroup.controls['epsilon'].setValue('');
    expect(comp.falsepositiongroup.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    await comp.falsepositiongroup.controls['equation'].setValue('43x-1');
    await comp.falsepositiongroup.controls['xl'].setValue('0.02');
    await comp.falsepositiongroup.controls['xr'].setValue('0.03');
    await comp.falsepositiongroup.controls['epsilon'].setValue('0.000001');
    expect(comp.falsepositiongroup.valid).toBeTruthy();
  });

});
