import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { Voyage } from "src/app/utils/models/voyage";
import { RegisterService } from "src/app/utils/services/register.service";
import { VoyageService } from "src/app/utils/services/voyage.service";

@Component({
  selector: "app-gp-managetrip",
  templateUrl: "./gp-managetrip.component.html",
  styleUrls: ["./gp-managetrip.component.scss"],
})
export class GpManagetripComponent implements OnInit {
  connectedUser: Utilisateur;
  voyages$: Observable<Voyage[]> | undefined;

  constructor(
    private _registerService: RegisterService,
    private _voyageService: VoyageService
  ) {}

  ngOnInit(): void {
    this.connectedUser = this._registerService.getConnectedUser();
    if (this.connectedUser.username) {
      this.voyages$ = this._voyageService.getVoyagesDuGp(
        this.connectedUser.username
      );
    }
  }
}
