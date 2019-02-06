import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-official-designation',
  templateUrl: './official-designation.component.html',
  styleUrls: ['./official-designation.component.css']
})
export class OfficialDesignationComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  editForm: FormGroup;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Zone: Boolean = false;
  Branch: Boolean = false;
  District: Boolean = false;
  // MatPaginator Output
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z]*')]),
      ContactNumber: new FormControl(null, [Validators.required]),
      District: new FormControl(null, [Validators.required]),
      Zone: new FormControl(null, [Validators.required]),
      Remarks: new FormControl(null, []),
      Branch: new FormControl(null, [Validators.required])
    });
  }
  openDeleteModal(deletetemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deletetemplate, {class: 'modal-sm'});
  }
  openEditModal(edittemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(edittemplate);
  }
  openViewModal(viewtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewtemplate);
  }
  openCreateModal(createtemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createtemplate);
  }
  confirm(): void {
    this.message = 'Confirmed!';
    this.confirmbtn = true;
    this.modalRef.hide();
    setTimeout(() => {
    }, 2000);
  }
  decline(): void {
    this.message = 'Declined!';
    this.declinebtn = true;
    this.modalRef.hide();
    setTimeout(() => {
    }, 1000);
  }
  checkall(value) {
    console.log(value);
    if (value === true) {
      this.editForm.controls.Zone.setValue(value);
      this.editForm.controls.District.setValue(value);
      this.editForm.controls.Branch.setValue(value);
    }
  }
  checkdistrict(value) {
    console.log(value);
    if (value === true) {
      this.editForm.controls.Zone.setValue(value);
      this.editForm.controls.Branch.setValue(value);
    }
  }
  checkzone(value) {
    console.log(value);
    if (value === true) {
      this.editForm.controls.Zone.setValue(value);
      this.editForm.controls.Branch.setValue(value);
    }
  }
  checkbranch(value) {
    console.log(value);
    if (value === true) {
      this.editForm.controls.Branch.setValue(value);
    }
  }

}

