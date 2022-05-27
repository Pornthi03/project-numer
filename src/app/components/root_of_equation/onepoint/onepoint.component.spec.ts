import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule, By } from '@angular/platform-browser';

import { OnepointComponent } from './onepoint.component';

describe('OnepointComponent', () => {
  let comp: OnepointComponent;
  let fixture: ComponentFixture<OnepointComponent>;
  let de: DebugElement;
  let el: HTMLLIElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnepointComponent ],
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
      fixture = TestBed.createComponent(OnepointComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should set cal true', () => {
    comp.onepointgroup.controls['equation'].setValue('1/4+x/2');
    comp.onepointgroup.controls['x'].setValue('2');
    comp.onepointgroup.controls['epsilon'].setValue('0.000001');
    comp.cal(comp.onepointgroup.value,comp.onepointgroup);
    expect(comp.cal).toBeTruthy();
  })


  it('form should be invalid', async() => {
    await comp.onepointgroup.controls['equation'].setValue('');
    await comp.onepointgroup.controls['x'].setValue('');
    await comp.onepointgroup.controls['epsilon'].setValue('');
    expect(comp.onepointgroup.valid).toBeFalsy();
  });

  it('form should be valid', async() => {
    await comp.onepointgroup.controls['equation'].setValue('1/4+x/2');
    await comp.onepointgroup.controls['x'].setValue('2');
    await comp.onepointgroup.controls['epsilon'].setValue('0.000001');
    expect(comp.onepointgroup.valid).toBeTruthy();
  });
});
