import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { Voyage } from "src/app/utils/models/voyage";
import { Subject } from "rxjs";
import { STATUTS_VOYAGES } from "src/app/utils/constantes/constantes";

@Component({
  selector: "app-updatevoyage",
  templateUrl: "./updatevoyage.component.html",
  styleUrls: ["./updatevoyage.component.scss"],
})
export class UpdateVoyageComponent implements OnInit {
  onClose: Subject<boolean>;
  updateVoyageForm: FormGroup;
  voyage: Voyage;
  statuts = STATUTS_VOYAGES;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private _voyageService: VoyageService
  ) {
    this.onClose = new Subject<boolean>();
  }

  ngOnInit() {
    // Initialize the form with the current voyage data
    this.updateVoyageForm = this.fb.group({
      statut: [this.voyage.statut, Validators.required],
      date_voyage: [this.voyage.date_voyage, Validators.required],
      ville_depart: [this.voyage.ville_depart, Validators.required],
      ville_arrivee: [this.voyage.ville_arrivee, Validators.required],
    });

    this.initEtatsVoyage();
  }

  // Handle change of voyage status
  changeEtatVoyage(event: any) {
    const selectedStatut = event.target.value;
    this.updateVoyageForm.patchValue({ statut: selectedStatut });
  }

  // Initialize the status options excluding the current status
  initEtatsVoyage() {
    this.statuts = this.statuts.filter(
      (statut) => statut !== this.voyage.statut
    );
  }

  // Save the changes made to the voyage
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

  // Close the modal without saving changes
  close() {
    this.bsModalRef.hide();
  }
}
