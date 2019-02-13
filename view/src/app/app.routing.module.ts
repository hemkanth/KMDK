import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { AuthComponent } from '../app/auth/auth.component';
import { LoginComponent } from './Components/login/login.component';
import { ActivityComponent } from './Components/activity/activity.component';
import { DashboardComponent} from './Components/dashboard/dashboard.component';
import { OfficalsListComponent } from './Components/officals-list/officals-list.component';
import { MembersListComponent  } from './Components/members-list/members-list.component';
import { AddressedComplaintsListComponent } from './Components/addressed-complaints-list/addressed-complaints-list.component';
import { RegisteredComplaintsListComponent } from './Components/registered-complaints-list/registered-complaints-list.component';
import { BranchListComponent} from './Components/branch-list/branch-list.component';
import { DistrictListComponent } from './Components/district-list/district-list.component';
import { DivisionListComponent } from './Components/division-list/division-list.component';
import { EnquiryListComponent } from './Components/enquiry-list/enquiry-list.component';
import { ZoneListComponent } from './Components/zone-list/zone-list.component';
import { GalleryListComponent } from './Components/gallery-list/gallery-list.component';
import { EventsListComponent } from './Components/events-list/events-list.component';
import { MemberApprovalListComponent } from './Components/member-approval-list/member-approval-list.component';
import { MemberIdcardPrintComponent } from './Components/member-idcard-print/member-idcard-print.component';
import { ConstituencyListComponent } from './Components/constituency-list/constituency-list.component';
import { OfficialDesignationComponent } from './Components/official-designation/official-designation.component';
import { ComplaintCategoryComponent } from './Components/complaint-category/complaint-category.component';
import { AdvertisementTypeComponent } from './Components/advertisement-type/advertisement-type.component';
import { BoothListComponent } from './Components/booth-list/booth-list.component';
import { MemberApprovalPeriodComponent } from './Components/member-approval-period/member-approval-period.component';
import { StateListComponent } from './Components/state-list/state-list.component';
import { DivisionOfficialsComponent } from './Components/division-officials/division-officials.component';
import { DownloadsComponent} from './Components/downloads/downloads.component';
import { BranchCertificateComponent } from './Components/branch-certificate/branch-certificate.component';
import { MemberApprovedListComponent } from './Components/member-approved-list/member-approved-list.component';
import { MemberRejectedListComponent } from './Components/member-rejected-list/member-rejected-list.component';
import { AdvertisementListComponent } from './Components/advertisement-list/advertisement-list.component';
import { PartyAffiliationComponent } from './Components/party-affiliation/party-affiliation.component';
import { RelationshipTypeComponent } from './Components/relationship-type/relationship-type.component';
import { AlbumListComponent} from './Components/album-list/album-list.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';

const appRoutes: Routes = [
    { path: '',
        component: AuthComponent,
        data: {
            animation: { value: 'auth', }
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            animation: { value: 'Dashboard', }
        }
    },
    { path: 'activity',
        component: ActivityComponent,
        data: {
            animation: { value: 'Activity', }
        }
    },
    { path: 'officials-list',
        component: OfficalsListComponent,
        data: {
            animation: { value: 'officials-list', }
        }
    },
    { path: 'members-list',
        component: MembersListComponent,
        data: {
            animation: { value: 'members-list', }
        }
    },
    { path: 'member-approval-list',
        component: MemberApprovalListComponent,
        data: {
            animation: { value: 'member-approval-list', }
        }
    },
    { path: 'member-idcard-print',
        component: MemberIdcardPrintComponent,
        data: {
            animation: { value: 'member-idcard-print', }
        }
    },
    { path: 'enquiry-list',
        component: EnquiryListComponent,
        data: {
            animation: { value: 'enquiry-list', }
        }
    },
    { path: 'constituency-list',
        component: ConstituencyListComponent,
        data: {
            animation: { value: 'constituency-list', }
        }
    },
    { path: 'district-list',
        component: DistrictListComponent,
        data: {
            animation: { value: 'district-list', }
        }
    },
    { path: 'zone-list',
        component: ZoneListComponent,
        data: {
            animation: { value: 'zone-list', }
        }
    },
    { path: 'branch-list',
        component: BranchListComponent,
        data: {
            animation: { value: 'branch-list', }
        }
    },
    { path: 'division-list',
        component: DivisionListComponent,
        data: {
            animation: { value: 'division-list', }
        }
    },
    { path: 'addressed-complaints-list',
        component: AddressedComplaintsListComponent,
        data: {
            animation: { value: 'addressed-complaints-list', }
        }
    },
    { path: 'registered-complaints-list',
        component: RegisteredComplaintsListComponent,
        data: {
            animation: { value: 'registered-complaints-list', }
        }
    },
    { path: 'gallery-list',
        component: GalleryListComponent,
        data: {
            animation: { value: 'gallery-list', }
        }
    },
    { path: 'official-designation',
        component: OfficialDesignationComponent,
        data: {
            animation: { value: 'official-designation', }
        }
    },
    { path: 'complaint-category',
    component: ComplaintCategoryComponent,
    data: {
        animation: { value: 'complaint-category', }
        }
    },
    { path: 'relationship-type',
    component: RelationshipTypeComponent,
    data: {
        animation: { value: 'relationship-type', }
        }
    },
    { path: 'album-list',
    component: AlbumListComponent,
    data: {
        animation: { value: 'album-list', }
        }
    },
    { path: 'events-list',
    component: EventsListComponent,
    data: {
        animation: { value: 'events-list', }
        }
    },
    { path: 'state-list',
        component: StateListComponent,
        data: {
            animation: { value: 'state-list', }
        }
    },
    { path: 'member-approval-period',
        component: MemberApprovalPeriodComponent,
        data: {
            animation: { value: 'member-approval-period', }
        }
    },
    { path: 'member-approved-list',
        component: MemberApprovedListComponent,
        data: {
            animation: { value: 'member-approved-list', }
        }
    },
    { path: 'member-rejected-list',
        component: MemberRejectedListComponent,
        data: {
            animation: { value: 'member-rejected-list', }
        }
    },
    { path: 'booth-list',
        component: BoothListComponent,
        data: {
            animation: { value: 'booth-list', }
        }
    },
    { path: 'advertisement-type',
        component: AdvertisementTypeComponent,
        data: {
            animation: { value: 'advertisement-type', }
        }
    },
    { path: 'advertisement-list',
        component: AdvertisementListComponent,
        data: {
            animation: { value: 'advertisement-list', }
        }
    },
    { path: 'downloads',
        component: DownloadsComponent,
        data: {
            animation: { value: 'downloads', }
        }
    },
    { path: 'division-officials',
        component: DivisionOfficialsComponent,
        data: {
            animation: { value: 'division-officials', }
        }
    },
    { path: 'branch-certificate',
        component: BranchCertificateComponent,
        data: {
            animation: { value: 'branch-certificate', }
        }
    },
    { path: 'party-affiliation',
        component: PartyAffiliationComponent,
        data: {
            animation: { value: 'party-affiliation', }
        }
    },
    { path: 'user-management',
        component: UserManagementComponent,
        data: {
            animation: { value: 'user-management', }
        }
    }
];

@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [AuthGuard],
    bootstrap: []
  })
  export class AppRoutingModule { }
