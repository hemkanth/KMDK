import { Component, OnInit, EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() public sidenavToggle = new EventEmitter();
  @Output() sidenavClose = new EventEmitter();

  constructor() {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
