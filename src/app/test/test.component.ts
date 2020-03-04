import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }
  
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  next() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}