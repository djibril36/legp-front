import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Colis } from "src/app/utils/models/colis";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { ColisService } from "src/app/utils/services/colis.service";
import { RegisterService } from "src/app/utils/services/register.service";

@Component({
  selector: "app-manageluggages",
  templateUrl: "./manageluggages.component.html",
  styleUrls: ["./manageluggages.component.scss"],
})
export class ManageluggagesComponent implements OnInit {
  isCollapsed = true;
  isSearchOpened = false;
  noResult = false;
  connectedUser: Utilisateur;
  searchForm: FormGroup;
  colis$: Observable<Colis[]> | null;
  colisFounded$: Observable<Colis[]> | null;

  constructor(
    private _registerService: RegisterService,
    private _colisService: ColisService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getColisduGp();
  }

  ngOnDestroy() {}

  openSearchBar() {
    this.isSearchOpened = true;
    this.initChercherForms();
  }

  closeSearchBar() {
    this.isSearchOpened = false;
    this.colisFounded$ = null;
  }

  getColisduGp() {
    this.connectedUser = this._registerService.getConnectedUser();
    if (this.connectedUser.username) {
      this.colis$ = this._colisService.getColisDuGp(
        this.connectedUser.username
      );
    }
  }

  searchColis() {
    let expediteur = this.searchForm.value["expediteur"] ?? " ";
    let destinataire = this.searchForm.value["destinataire"] ?? " ";
    let numeroColis = this.searchForm.value["numeroColis"] ?? " ";

    if (expediteur || destinataire || numeroColis) {
      this.colisFounded$ = this._colisService.rechercheColis(
        numeroColis,
        expediteur,
        destinataire,
        this.connectedUser.username
      );
      if (!this.colisFounded$) {
        this.noResult = true;
      } else this.noResult = false;
    }
  }

  initChercherForms() {
    this.searchForm = this._formBuilder.group({
      numeroColis: [""],
      expediteur: [""],
      destinataire: [""],
    });
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }
}
