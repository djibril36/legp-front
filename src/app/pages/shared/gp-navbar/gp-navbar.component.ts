import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RegisterService } from "src/app/utils/services/register.service";
import { ToastService } from "src/app/utils/services/toast.service";

@Component({
  selector: "app-gp-navbar",
  templateUrl: "./gp-navbar.component.html",
  styleUrls: ["./gp-navbar.component.scss"],
})
export class GpNavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  isLoggedIn = false;
  authStatus!: Subscription;
  private loginSub: Subscription | undefined;
  authResponse: Subscription;

  constructor(
    private _router: Router,
    private _toast: ToastService,
    private _registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.authStatus = this._registerService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  logOut() {
    this._registerService.logout();
    this._toast.showSuccess("Successfully logged out.");
    this._router.navigateByUrl("/");
  }
}
