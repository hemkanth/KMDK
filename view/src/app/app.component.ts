import { Component, OnInit, EventEmitter , Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() public sidenavToggle = new EventEmitter();
  @Output() sidenavClose = new EventEmitter();
  editForm: FormGroup;
  menulanguage: any;
  languagelist: any[] = [
    {label: 'தமிழ்', value: 'tamil'},
    {label: 'ஆங்கிலம்', value: 'english'}
];
  constructor() {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  getlanguage(value) {
    console.log(value);
    this.menulanguage = value;
  }
}
