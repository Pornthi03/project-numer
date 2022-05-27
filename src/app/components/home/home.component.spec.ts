import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF, Location } from "@angular/common";
import { HomeComponent } from './home.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { BisectionComponent } from '../root_of_equation/bisection/bisection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  const routes: Routes = [
  {path: 'bisection',component:BisectionComponent}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterModule.forRoot(routes),
        RouterTestingModule.withRoutes(routes)],
      declarations: [ HomeComponent ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('NUMERICAL METHODS');
  });
});
