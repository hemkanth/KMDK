import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxGalleryModule } from 'ngx-gallery';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app.routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material';
import { MatSidenavModule, MatListModule  } from '@angular/material';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ActivityComponent } from './Components/activity/activity.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { OfficalsListComponent } from './Components/officals-list/officals-list.component';
import { MembersListComponent } from './Components/members-list/members-list.component';
import { EnquiryListComponent } from './Components/enquiry-list/enquiry-list.component';
import { DistrictListComponent } from './Components/district-list/district-list.component';
import { ZoneListComponent } from './Components/zone-list/zone-list.component';
import { BranchListComponent } from './Components/branch-list/branch-list.component';
import { DivisionListComponent } from './Components/division-list/division-list.component';
import { RegisteredComplaintsListComponent } from './Components/registered-complaints-list/registered-complaints-list.component';
import { AddressedComplaintsListComponent } from './Components/addressed-complaints-list/addressed-complaints-list.component';
import { GalleryListComponent } from './Components/gallery-list/gallery-list.component';
import { MemberApprovalListComponent } from './Components/member-approval-list/member-approval-list.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { EventsListComponent } from './Components/events-list/events-list.component';
import { MemberIdcardPrintComponent } from './Components/member-idcard-print/member-idcard-print.component';
import { ConstituencyListComponent } from './Components/constituency-list/constituency-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginPageComponent } from './Components/common/login-page/login-page.component';
import { OfficialDesignationComponent } from './Components/official-designation/official-designation.component';
import { ComplaintCategoryComponent } from './Components/complaint-category/complaint-category.component';
import { BoothListComponent } from './Components/booth-list/booth-list.component';
import { AdvertisementTypeComponent } from './Components/advertisement-type/advertisement-type.component';
import { MemberApprovalPeriodComponent } from './Components/member-approval-period/member-approval-period.component';
import { StateListComponent } from './Components/state-list/state-list.component';
import { DivisionOfficialsComponent } from './Components/division-officials/division-officials.component';
import { BranchCertificateComponent } from './Components/branch-certificate/branch-certificate.component';
import { DownloadsComponent } from './Components/downloads/downloads.component';
import { MemberRejectedListComponent } from './Components/member-rejected-list/member-rejected-list.component';
import { MemberApprovedListComponent } from './Components/member-approved-list/member-approved-list.component';
import { AdvertisementListComponent } from './Components/advertisement-list/advertisement-list.component';
import { PartyAffiliationComponent } from './Components/party-affiliation/party-affiliation.component';
import { RelationshipTypeComponent } from './Components/relationship-type/relationship-type.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    DashboardComponent,
    OfficalsListComponent,
    MembersListComponent,
    EnquiryListComponent,
    DistrictListComponent,
    ZoneListComponent,
    BranchListComponent,
    DivisionListComponent,
    RegisteredComplaintsListComponent,
    AddressedComplaintsListComponent,
    GalleryListComponent,
    MemberApprovalListComponent,
    LoginComponent,
    AuthComponent,
    EventsListComponent,
    MemberIdcardPrintComponent,
    ConstituencyListComponent,
    LoginPageComponent,
    OfficialDesignationComponent,
    ComplaintCategoryComponent,
    BoothListComponent,
    AdvertisementTypeComponent,
    MemberApprovalPeriodComponent,
    StateListComponent,
    DivisionOfficialsComponent,
    BranchCertificateComponent,
    DownloadsComponent,
    MemberRejectedListComponent,
    MemberApprovedListComponent,
    AdvertisementListComponent,
    PartyAffiliationComponent,
    RelationshipTypeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    NgSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    NgxImageZoomModule.forRoot(),
    ModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

