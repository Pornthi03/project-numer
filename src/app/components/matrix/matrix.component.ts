import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  // name = 'Angular';
  // rows = 6;
  // cols = 3;
  // form = new FormArray([]);
  // ngOnInit() {
  //   for (let i = 0; i < this.rows; i++) {
  //     this.form.push(new FormArray([]));
  //     for (let j = 0; j < this.cols; j++) {
  //       (this.form.at(i) as FormArray).push(new FormControl());
  //     }
  //   }
  // }

  test: FormGroup;

  constructor() {
    this.test = new FormGroup({
      mA: new FormArray([
        new FormControl(null),
        new FormControl(null),
        new FormControl(null)
    ])
    });
  }

  get m0Controls(){
    return (<FormArray>this.test.get('m0')).controls;
  }

  get m1Controls(){
    return (<FormArray>this.test.get('m0')).controls;
  }

  get m2Controls(){
    return (<FormArray>this.test.get('m0')).controls;
  }
  ngOnInit(): void {

    this.test = new FormGroup({
      m0: new FormArray([
          new FormControl(null),
          new FormControl(null),
          new FormControl(null)
      ]),
      m1: new FormArray([
        new FormControl(null),
        new FormControl(null),
        new FormControl(null)
      ]),
      m2: new FormArray([
        new FormControl(null),
        new FormControl(null),
        new FormControl(null)
      ])
    });
    console.log(this.test)
  }
}
