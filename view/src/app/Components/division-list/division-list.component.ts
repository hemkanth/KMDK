import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css']
})
export class DivisionListComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  editForm: FormGroup;
  Districtlist: any[] = [
    {label: 'நாமக்கல்', value: 'Namakkal'},
    {label: 'கரூர்', value: 'Karur'},
    {label: 'பொள்ளாச்சி', value: 'Pollachi'},
    {label: 'மதுரை', value: 'Madurai'},
    {label: 'கோயம்புத்தூர்', value: 'Coimbatore'}
  ];
  Zonelist: any[] = [
    {label: 'துடியலூர்', value: 'Namakkal'},
    {label: 'பெரியநாயக்கன்பாளையம்', value: 'Karur'},
    {label: 'கவுண்டம்பாளையம்', value: 'Pollachi'},
    {label: 'ஆனைமலை', value: 'Madurai'},
    {label: 'கோட்டூர்', value: 'Coimbatore'}
  ];
  Branchlist: any[] = [
    {label: 'நாமக்கல்', value: 'Namakkal'},
    {label: 'கரூர்', value: 'Karur'},
    {label: 'பொள்ளாச்சி', value: 'Pollachi'},
    {label: 'மதுரை', value: 'Madurai'},
    {label: 'கோயம்புத்தூர்', value: 'Coimbatore'}
  ];
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
