import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";

import { PagesModule } from "./pages/pages.module";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/content/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/content/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/content/landingpage/landingpage.component";
import { RatingComponent } from "./utils/othersComponents/rating/rating.component";
import { ErrorInterceptor } from "./utils/services/http-interceptors/error.interceptor.service";
import { ConfirmationDialogComponent } from './utils/dialog/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    // IndexComponent,
    // ProfilepageComponent,
    // RegisterpageComponent,
    // LandingpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    PagesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
