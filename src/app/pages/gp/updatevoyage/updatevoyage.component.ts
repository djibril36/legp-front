import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { Voyage } from "src/app/utils/models/voyage";
import { Subject } from "rxjs";

@Component({
  selector: "app-updatevoyage",
  templateUrl: "./updatevoyage.component.html",
  styleUrls: ["./updatevoyage.component.scss"],
})
export class UpdateVoyageComponent implements OnInit {
  onClose: any;
  updateVoyageForm: FormGroup;
  voyage: Voyage;
  statuts = [
    "voyage en cours",
    "voyage annulé",
    "voyage reporté",
    "voyage terminé",
  ];

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _voyageService: VoyageService
  ) {}

  ngOnInit() {
    this.updateVoyageForm = this.fb.group({
      statut: [this.voyage.statut, Validators.required],
      date_voyage: [this.voyage.date_voyage, Validators.required],
      ville_depart: [this.voyage.ville_depart, Validators.required],
      ville_arrivee: [this.voyage.ville_arrivee, Validators.required],
    });
    this.initEtatsVoyage();
    this.onClose = new Subject();
  }

  // changement etat du colis
  changeEtatVoyage(event: any) {
    this.updateVoyageForm.value["statut"] = event.target.value;
  }

  initEtatsVoyage() {
    for (let i = 0; i < this.statuts.length; i++) {
      if (this.statuts[i] === this.voyage.statut) this.statuts.splice(i, 1);
    }
  }

  async saveChanges() {
    if (this.updateVoyageForm.valid) {
      const updatedVoyage = { ...this.voyage, ...this.updateVoyageForm.value };
      this._voyageService.updateVoyage(updatedVoyage).subscribe(
        () => {
          this.onClose.next(true);
          this.bsModalRef.hide();
        },
        (error) => {
          console.error("Erreur lors de la mise à jour du voyage", error);
        }
      );
    }
  }

  close() {
    this.bsModalRef.hide();
  }
}
