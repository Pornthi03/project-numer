import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule, By } from '@angular/platform-browser';

import { NewtonraphsonComponent } from './newtonraphson.component';

describe('NewtonraphsonComponent', () => {
  let comp: NewtonraphsonComponent;
  let fixture: ComponentFixture<NewtonraphsonComponent>;
  let de: DebugElement;
  let el: HTMLLIElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtonraphsonComponent ],
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
      fixture = TestBed.createComponent(NewtonraphsonComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should set cal true', () => {
    comp.newtonraphsongroup.controls['equation'].setValue('1/4+x/2');
    comp.newtonraphsongroup.controls['x'].setValue('2');
    comp.newtonraphsongroup.controls['epsilon'].setValue('0.000001');
    comp.cal(comp.newtonraphsongroup.value,comp.newtonraphsongroup);
    expect(comp.cal).toBeTruthy();
  })


  it('form should be invalid', async() => {
    await comp.newtonraphsongroup.controls['equation'].setValue('');
    await comp.newtonraphsongroup.controls['x'].setValue('');
    await comp.newtonraphsongroup.controls['epsilon'].setValue('');
    expect(comp.newtonraphsongroup.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    await comp.newtonraphsongroup.controls['equation'].setValue('1/4+x/2');
    await comp.newtonraphsongroup.controls['x'].setValue('2');
    await comp.newtonraphsongroup.controls['epsilon'].setValue('0.000001');
    expect(comp.newtonraphsongroup.valid).toBeTruthy();
  });
});
