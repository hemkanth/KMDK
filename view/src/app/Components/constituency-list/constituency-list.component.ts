import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
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
  selector: 'app-constituency-list',
  templateUrl: './constituency-list.component.html',
  styleUrls: ['./constituency-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConstituencyListComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  editForm: FormGroup;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  Branchlist: any[] = [
    {label: 'நாமக்கல்', value: 'Namakkal'},
    {label: 'கரூர்', value: 'Karur'},
    {label: 'பொள்ளாச்சி', value: 'Pollachi'},
    {label: 'மதுரை', value: 'Madurai'},
    {label: 'கோயம்புத்தூர்', value: 'Coimbatore'}
  ];
  myOptions: any[] = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'}
];
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
      Branch: new FormControl(null, [Validators.required])
    });
  }
  openDeleteparlimentModal(deleteparlimenttemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteparlimenttemplate, {class: 'modal-sm'});
  }
  openEditparlimentModal(editparlimenttemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(editparlimenttemplate);
  }
  openViewparlimentModal(viewparlimenttemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewparlimenttemplate);
  }
  openCreateassemblyModal(createassemblytemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createassemblytemplate);
  }
  openDeleteassemblyModal(deleteassemblytemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteassemblytemplate, {class: 'modal-sm'});
  }
  openEditassemblyModal(editassemblytemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(editassemblytemplate);
  }
  openViewassemblyModal(viewassemblytemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewassemblytemplate);
  }
  openCreateparlimentModal(createparlimenttemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(createparlimenttemplate);
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
