import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/content/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/content/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/content/landingpage/landingpage.component";
import { GpsearchpageComponent } from "./pages/content/gpsearchpage/gpsearchpage.component";
import { LuggagefollowupComponent } from "./pages/content/luggagefollowup/luggagefollowup.component";
import { TestComponent } from "./pages/content/test/test.component";
import { LoginComponent } from "./pages/content/login/login.component";
import { GpprofilepageComponent } from "./pages/content/gpprofilepage/gpprofilepage.component";
import { CreateluggageComponent } from "./pages/gp/createluggage/createluggage.component";
import { ManageluggagesComponent } from "./pages/gp/manageluggages/manageluggages.component";
import { ClientTripComponent } from "./pages/client/client-trip/client-trip.component";
import { GpManagetripComponent } from "./pages/gp/gp-managetrip/gp-managetrip.component";
import { RatingComponent } from "./utils/othersComponents/rating/rating.component";
import { OwnClientsComponent } from "./pages/gp/own-clients/own-clients.component";
import { LoggedInGuard } from "./core/guards/logged-in.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "gpsearch", component: GpsearchpageComponent },
  { path: "followup", component: LuggagefollowupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "gp-profile",
    canActivate: [LoggedInGuard],
    component: GpprofilepageComponent,
  },
  { path: "gp-createlug", component: CreateluggageComponent },
  { path: "gp-managelug", component: ManageluggagesComponent },
  { path: "gp-managetrip", component: GpManagetripComponent },

  // { path: "client-trip", component: ClientTripComponent },
  { path: "own-clients", component: OwnClientsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
