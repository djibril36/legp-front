import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule, BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./content/profilepage/profilepage.component";
import { RegisterpageComponent } from "./content/registerpage/registerpage.component";
import { LandingpageComponent } from "./content/landingpage/landingpage.component";
import { GpsearchpageComponent } from "./content/gpsearchpage/gpsearchpage.component";
import { LuggagefollowupComponent } from "./content/luggagefollowup/luggagefollowup.component";
import { TestComponent } from "./content/test/test.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { LoginComponent } from "./content/login/login.component";
import { GpprofilepageComponent } from "./content/gpprofilepage/gpprofilepage.component";
import { CreateluggageComponent } from "./gp/createluggage/createluggage.component";
import { ManageluggagesComponent } from "./gp/manageluggages/manageluggages.component";
import { ClientTripComponent } from "./client/client-trip/client-trip.component";
import { TravelsofweekComponent } from "./content/travelsofweek/travelsofweek.component";
import { GpManagetripComponent } from "./gp/gp-managetrip/gp-managetrip.component";
import { GpNavbarComponent } from "./shared/gp-navbar/gp-navbar.component";
import { OwnClientsComponent } from "./gp/own-clients/own-clients.component";
import { GpFooterComponent } from "./shared/gp-footer/gp-footer.component";
import { UpdateluggageComponent } from "./gp/updateluggage/updateluggage.component";
import { UpdateVoyageComponent } from "./gp/updatevoyage/updatevoyage.component";
import { GpProfileEditPageComponent } from './content/gp-profile-edit-page/gp-profile-edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    GpsearchpageComponent,
    LuggagefollowupComponent,
    TestComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    GpprofilepageComponent,
    CreateluggageComponent,
    ManageluggagesComponent,
    ClientTripComponent,
    TravelsofweekComponent,
    GpManagetripComponent,
    GpNavbarComponent,
    OwnClientsComponent,
    GpFooterComponent,
    UpdateluggageComponent,
    UpdateVoyageComponent,
    GpProfileEditPageComponent,
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
  ],
  providers: [],
})
export class PagesModule {}
