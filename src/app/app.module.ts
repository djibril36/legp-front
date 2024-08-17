import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// import { BsDropdownModule } from "ngx-bootstrap/dropdown";
// import { ProgressbarModule } from "ngx-bootstrap/progressbar";
// import { TooltipModule } from "ngx-bootstrap/tooltip";
// import { CollapseModule } from "ngx-bootstrap/collapse";
// import { TabsModule } from "ngx-bootstrap/tabs";
// import { PaginationModule } from "ngx-bootstrap/pagination";
// import { AlertModule } from "ngx-bootstrap/alert";
// import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
// import { CarouselModule } from "ngx-bootstrap/carousel";
// import { ModalModule } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { PagesModule } from "./pages/pages.module";
import { ErrorInterceptor } from "./utils/services/http-interceptors/error.interceptor.service";

@NgModule({
  declarations: [AppComponent],
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
