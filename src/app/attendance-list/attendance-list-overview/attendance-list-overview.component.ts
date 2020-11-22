import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-list-overview',
  templateUrl: './attendance-list-overview.component.html',
  styleUrls: ['./attendance-list-overview.component.scss']
})
export class AttendanceListOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('app-attendance-list-overview');
  }

}
