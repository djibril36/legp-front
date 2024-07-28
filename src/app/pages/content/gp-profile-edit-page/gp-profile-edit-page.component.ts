import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RegisterService } from "src/app/utils/services/register.service";
import { Utilisateur } from "src/app/utils/models/utilisateur";

@Component({
  selector: "app-gp-profile-edit-page",
  templateUrl: "./gp-profile-edit-page.component.html",
  styleUrls: ["./gp-profile-edit-page.component.scss"],
})
export class GpProfileEditPageComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  connectedUser: Utilisateur;

  constructor(
    private formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router
  ) {}

  ngOnInit() {
    // Information du GP connecté
    this.connectedUser = this._registerService.getConnectedUser();

    // Initialisation du formulaire
    this.profileForm = this.formBuilder.group({
      username: [this.connectedUser.username, Validators.required],
      email: [
        this.connectedUser.email,
        [Validators.required, Validators.email],
      ],
      // phone: [this.connectedUser.phone, Validators.required],
      // address: [this.connectedUser.address, Validators.required],
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Si le formulaire est invalide, arrêter le processus
    if (this.profileForm.invalid) {
      return;
    }

    // Appel du service pour mettre à jour les informations du profil
    this._registerService
      .updateUser(this.connectedUser.id, this.profileForm.value)
      .subscribe({
        next: () => {
          this._router.navigateByUrl("/gp-profile");
        },
        error: (error) => {
          console.error("Error updating profile", error);
        },
      });
  }
}
