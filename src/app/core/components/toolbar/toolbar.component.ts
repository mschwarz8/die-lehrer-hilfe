import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  snav: MatSidenav;

  currentSelectedClass = new FormControl('');

  availableClasses: string[];

  constructor() {}

  ngOnInit(): void {
    this.availableClasses = ['7a', '8b'];
  }
}
