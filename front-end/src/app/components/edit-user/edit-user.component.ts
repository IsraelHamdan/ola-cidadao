import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.sass',
})
export class EditUserComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};

  formUserEdit!: FormGroup;

  ngOnInit(): void {
    this.formUserEdit = this.fb.group({
      
    })
  }

  constructor(private fb: FormBuilder) {

  }

  onSubmit() {

  }
}
