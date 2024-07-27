import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { Voyage } from "src/app/utils/models/voyage";
import { RegisterService } from "src/app/utils/services/register.service";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { DialogService } from "src/app/utils/services/dialog.service";

@Component({
  selector: "app-gp-managetrip",
  templateUrl: "./gp-managetrip.component.html",
  styleUrls: ["./gp-managetrip.component.scss"],
})
export class GpManagetripComponent implements OnInit {
  date_voyage: string = "Date du voyage";
  connectedUser: Utilisateur;
  voyages$: Observable<Voyage[]> | undefined;

  constructor(
    private _registerService: RegisterService,
    private _voyageService: VoyageService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadVoyages();
  }

  loadVoyages() {
    this.connectedUser = this._registerService.getConnectedUser();
    if (this.connectedUser.username) {
      this.voyages$ = this._voyageService.getVoyagesDuGp(
        this.connectedUser.username
      );
    }
  }

  // modifier voyage
  openEditVoyageModal(voyage: Voyage) {
    this._dialogService.openEditVoyageModal(voyage).subscribe((result) => {
      if (result) {
        this.loadVoyages();
      }
    });
  }

  // supprimer voyage
  deleteVoyage(voyage: Voyage) {
    this._dialogService
      .confirm(
        "Confirmation",
        "Voulez-vous vraiment supprimer ce voyage ?",
        "Supprimer",
        "Annuler"
      )
      .subscribe((result) => {
        if (result) {
          this._voyageService.deleteVoyage(voyage.id).subscribe(
            () => {
              this.loadVoyages();
            },

            (error) => {
              console.error("Error deleting Voyage", error);
            }
          );
        }
      });
  }
}
