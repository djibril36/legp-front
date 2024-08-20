import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-connexion-modal",
  templateUrl: "./connexion-modal.component.html",
  styleUrls: ["./connexion-modal.component.scss"],
})
export class ConnexionModalComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() logOnEvent = new EventEmitter<void>();

  registerForm: FormGroup;
  submitted = false;
  focus1: boolean;
  focus2: boolean;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  logOn() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.logOnEvent.emit();
    }
  }

  closeModal(modal: any) {
    modal.hide();
  }
}
