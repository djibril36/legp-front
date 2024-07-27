import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ColisService } from "src/app/utils/services/colis.service";
import { Observable, Subject } from "rxjs";
import { Colis } from "src/app/utils/models/colis";
@Component({
  selector: "app-updateluggage",
  templateUrl: "./updateluggage.component.html",
  styleUrls: ["./updateluggage.component.scss"],
})
export class UpdateluggageComponent implements OnInit {
  colis: Colis;
  onClose: any;
  idColis: number;
  payement: string;
  nvEtatColis: string;
  editColisForm: FormGroup;
  isPesable: boolean = true;
  isautreEtat: boolean = false;
  etatsColis = [
    "voyage en cours",
    "colis disponible",
    "colis recupéré",
    "autre",
  ];

  constructor(
    public bsModalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _colisService: ColisService
  ) {}

  ngOnInit() {
    this.initEditColisForm();
    if (!this.editColisForm.value["poids"]) this.isPesable = false;
    this.initEtatsColis();
    this.onClose = new Subject();
  }

  initEditColisForm() {
    this.editColisForm = this._formBuilder.group({
      etatColis: [this.colis.etatColis, Validators.required],
      autreEtat: [""],
      description: [this.colis.description, Validators.required],
      poids: [this.colis.poids, Validators.required],
      expediteur: [this.colis.expediteur, Validators.required],
      telephoneExp: [this.colis.telephoneExp, Validators.required],
      destinataire: [this.colis.destinataire, Validators.required],
      telephoneDest: [this.colis.telephoneDest, Validators.required],
      montant: [this.colis.montant, Validators.required],
      paye: [
        (this.payement = this.colis.paye ? "oui" : "non"),
        Validators.required,
      ],
    });
  }

  initEtatsColis() {
    for (let i = 0; i < this.etatsColis.length; i++) {
      if (this.etatsColis[i] === this.colis.etatColis)
        this.etatsColis.splice(i, 1);
    }
  }

  // changement etat du colis
  ChangeEtatColis(event: any) {
    this.isautreEtat = false;
    this.nvEtatColis = event.target.value;
    if (this.nvEtatColis === "autre") this.isautreEtat = true;
  }

  // save modif
  async saveChanges() {
    if (this.editColisForm.valid) {
      const changedColis: Colis = {
        description: this.editColisForm.value["description"],
        montant: this.editColisForm.value["montant"],
        expediteur: this.editColisForm.value["expediteur"],
        telephoneExp: this.editColisForm.value["telephoneExp"],
        destinataire: this.editColisForm.value["destinataire"],
        telephoneDest: this.editColisForm.value["telephoneDest"],
        etatColis: this.isautreEtat
          ? this.editColisForm.value["autreEtat"]
          : this.nvEtatColis,
        poids: this.editColisForm.value["poids"],
        paye: this.editColisForm.value["paye"] === "oui" ? true : false,
      };
      // envoi vers l API
      this._colisService.updateColis(changedColis).subscribe(() => {
        this.onClose.next(true);
        this.bsModalRef.hide();
      });
    }
  }

  close() {
    this.bsModalRef.hide();
  }
}
