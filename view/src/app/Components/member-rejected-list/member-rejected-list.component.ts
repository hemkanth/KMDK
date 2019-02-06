import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-member-rejected-list',
  templateUrl: './member-rejected-list.component.html',
  styleUrls: ['./member-rejected-list.component.css']
})
export class MemberRejectedListComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  showcontent: Boolean = false;
  editForm: FormGroup;
  // showkulam = false;
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  zonelist: any[] = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'}
  ];
  branchlist: any[] = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'}
  ];
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z]*')]),
      ContactNumber: new FormControl(null, [Validators.required]),
      District: new FormControl(null, [Validators.required]),
      Zone: new FormControl(null, [Validators.required]),
      Kulam: new FormControl(null, [Validators.required]),
      Branch: new FormControl(null, [Validators.required]),
      memberpic: new FormControl(null)
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
  showkulam(value) {
    this.showcontent = value;
  }

}
