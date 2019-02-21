import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
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
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  modalRef: BsModalRef;
  message: string;
  confirmbtn: Boolean = false;
  declinebtn: Boolean = false;
  editForm: FormGroup;
  Albumlist: any[] = [
    {label: 'துடியலூர்', value: 'Namakkal'},
    {label: 'பெரியநாயக்கன்பாளையம்', value: 'Karur'},
    {label: 'கவுண்டம்பாளையம்', value: 'Pollachi'},
    {label: 'ஆனைமலை', value: 'Madurai'},
    {label: 'கோட்டூர்', value: 'Coimbatore'}
  ];
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.galleryOptions = [
        {
            width: '600px',
            height: '400px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
    ];

    this.galleryImages = [
        {
            small: 'assets/images/1.png',
            medium: 'assets/images/2.png',
            big: 'assets/images/3.png'
        },
        {
            small: 'assets/images/2.png',
            medium: 'assets/images/2.png',
            big: 'assets/images/2.png'
        },
        {
            small: 'assets/images/3.png',
            medium: 'assets/images/3.png',
            big: 'assets/images/2.png'
        }
    ];
    this.editForm = new FormGroup({
        galleryname: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z]*')]),
        galleryimage: new FormControl(null, [Validators.required])
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

