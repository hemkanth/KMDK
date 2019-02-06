import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-division-officials',
  templateUrl: './division-officials.component.html',
  styleUrls: ['./division-officials.component.css']
})
export class DivisionOfficialsComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  editForm: FormGroup;
  Branchlist: any[] = [
    {label: 'நாமக்கல்', value: 'Namakkal'},
    {label: 'கரூர்', value: 'Karur'},
    {label: 'பொள்ளாச்சி', value: 'Pollachi'},
    {label: 'மதுரை', value: 'Madurai'},
    {label: 'கோயம்புத்தூர்', value: 'Coimbatore'}
  ];
  Userlist: any[] = [
    {label: 'நிர்வாகி 1', value: '1'},
    {label: 'நிர்வாகி 2', value: '2'},
    {label: 'நிர்வாகி 3', value: '3'},
    {label: 'நிர்வாகி 4', value: '4'},
    {label: 'நிர்வாகி 5', value: '5'}
  ];
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z]*')]),
      ContactNumber: new FormControl(null, [Validators.required]),
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
}
