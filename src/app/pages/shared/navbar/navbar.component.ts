import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RegisterService } from "src/app/utils/services/register.service";
import { StorageService } from "src/app/utils/services/storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  identifier: string;
  password: string;
  isCollapsed = true;
  focus1: boolean;
  focus2: boolean;

  submitted: boolean = false;
  isLoading = false; // Pour gérer l'état du loader
  erroMessage: string = "";
  isLoggedIn = false;
  avatarInitial = "";
  username = "";
  authStatus!: Subscription;
  private loginSub: Subscription | undefined;
  authResponse: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _storageService: StorageService,
    private _registerService: RegisterService
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.authStatus = this._registerService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
        if (status) {
          this.username = this._registerService.getConnectedUser().username;
          this.avatarInitial = this.username[0] || "Q";
        }
      }
    );

    // init logIn form
    this.registerForm = this.formBuilder.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async logOn() {
    this.submitted = true;
    this.erroMessage = ""; // Clear previous error message
    this.isLoading = true; // Show loader

    if (this.registerForm.valid) {
      this._registerService
        .login(
          this.registerForm.value.identifier,
          this.registerForm.value.password
        )
        .subscribe({
          next: (authresponse) => {
            this.registerForm.reset();
            this._registerService.persistUser(authresponse);
            const attemptedRoute =
              this._storageService.getItem("attemptedRoute");
            this._storageService.removeItem("attemptedRoute");
            this.isLoading = false; // Hide loader
            this._router.navigateByUrl(attemptedRoute || "/gp-profile");
          },
          error: (error) => {
            this.erroMessage = "Nom d'utilisateur ou mot de passe incorrect"; // Show error message
            this.isLoading = false; // Hide loader
          },
        });
    } else {
      this.isLoading = false; // Hide loader if form is invalid
    }
  }

  logOut() {
    this._registerService.logout();
    this._router.navigateByUrl("/");
  }
}
