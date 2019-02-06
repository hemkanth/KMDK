import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

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
}

}
