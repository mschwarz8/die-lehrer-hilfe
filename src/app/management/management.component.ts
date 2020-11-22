import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export interface Class {
  externalId: string;
  name: string;
  grade: number;
  numberStudents: number;
}

const ELEMENT_DATA: Class[] = [
  {externalId: 'be6d908a-4dfb-4ab6-a6f3-f2fe8f6eae55', name: '7a', grade: 7, numberStudents: 24},
  {externalId: 'ad4bb066-8483-4298-8f3f-272c9674437a', name: '8b', grade: 8, numberStudents: 21},
];

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public createClassFormGroup: FormGroup | undefined;

  public createNewClassMode = false;

  public displayedColumns: string[] = ['className', 'numberStudents'];
  public dataSource = ELEMENT_DATA;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createClassFormGroup = this.fb.group({
      className: [null, Validators.required],
      students: this.fb.array([]),
    });
  }

  public createNewClass() {
    console.log('TODO: Erstelle neue Klasse...');
  }

  public get classNameFormControl(): any {
    return this.createClassFormGroup.get('className');
  }
}
