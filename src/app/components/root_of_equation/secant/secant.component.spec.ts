import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule, By } from '@angular/platform-browser';

import { SecantComponent } from './secant.component';

describe('SecantComponent', () => {
  let comp: SecantComponent;
  let fixture: ComponentFixture<SecantComponent>;
  let de: DebugElement;
  let el: HTMLLIElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecantComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatCardModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SecantComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should set cal true', () => {
    comp.secantgroup.controls['equation'].setValue('1/4+x/2');
    comp.secantgroup.controls['x'].setValue('2');
    comp.secantgroup.controls['epsilon'].setValue('0.000001');
    comp.cal(comp.secantgroup.value,comp.secantgroup);
    expect(comp.cal).toBeTruthy();
  })


  it('form should be invalid', async() => {
    await comp.secantgroup.controls['equation'].setValue('');
    await comp.secantgroup.controls['x'].setValue('');
    await comp.secantgroup.controls['xi'].setValue('');
    await comp.secantgroup.controls['epsilon'].setValue('');
    expect(comp.secantgroup.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    await comp.secantgroup.controls['equation'].setValue('x^2-7');
    await comp.secantgroup.controls['x'].setValue('2');
    await comp.secantgroup.controls['xi'].setValue('2.75');
    await comp.secantgroup.controls['epsilon'].setValue('0.000001');
    expect(comp.secantgroup.valid).toBeTruthy();
  });
});
