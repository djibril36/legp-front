import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Pays } from "src/app/utils/models/pays";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { Voyage } from "src/app/utils/models/voyage";
import { ColisService } from "src/app/utils/services/colis.service";
import { RegisterService } from "src/app/utils/services/register.service";
import { VoyageService } from "src/app/utils/services/voyage.service";

@Component({
  selector: "app-createluggage",
  templateUrl: "./createluggage.component.html",
  styleUrls: ["./createluggage.component.scss"],
})
export class CreateluggageComponent implements OnInit {
  isCollapsed: boolean = false;
  isStep1: boolean = true;
  isStep2: boolean = false;
  isStep3: boolean = false;
  progressValue: number;
  montant: number;
  descriptionColis: string;
  currentToken: string;
  voyageSelected: string;
  indicatifExp: string;
  indicatifDest: string;
  deviseSelected: string;
  descriptionColisTab1Form: FormGroup;
  descriptionColisTab2Form: FormGroup;
  colisForm: FormGroup;
  connectedUser: Utilisateur;
  voyages$: Observable<Voyage[]> | undefined;
  pays$: Observable<Pays[]> | undefined;
  voyage: Voyage;
  httpOptions: { headers: any };

  constructor(
    private _registerService: RegisterService,
    private _voyageService: VoyageService,
    private _colisService: ColisService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.progressValue = 30;
    this.getUserVoyages();
    this.initForms();
    this.generateNumberColis();
  }

  createColis() {
    if (
      this.colisForm.value["destinataire"] &&
      this.colisForm.value["cinDest"] &&
      this.colisForm.value["telephoneDest"]
    ) {
      const newColis = {
        data: {
          numero_colis: this.generateNumberColis(),
          description: this.descriptionColis,
          montant: this.montant + " " + this.deviseSelected,
          expediteur: this.colisForm.value["expediteur"],
          telephoneExp:
            this.indicatifExp + this.colisForm.value["telephoneExp"],
          telephoneDest:
            this.indicatifDest + this.colisForm.value["telephoneDest"],
          cinExp: this.colisForm.value["cinExp"],
          cinDest: this.colisForm.value["cinDest"],
          paye: this.colisForm.value["paye"],
          etatColis: "voyage en cours",
          destinataire: this.colisForm.value["destinataire"],
          voyage_details: this.voyageSelected,
          // gp: this.connectedUser,
          nom_gp: this.connectedUser.username,
        },
      };
      this._colisService.createColis(newColis).subscribe({
        next: () => {
          this._router.navigateByUrl("/gp-managelug");
        },
        error: (error) => {
          error;
        },
      });
    }
  }

  selectVoyage(event: any) {
    this.voyageSelected = event.target.value;
  }

  selectIndicatifExp(event: any) {
    let indicatif = event.target.value;
    indicatif = indicatif.split(" ");
    this.indicatifExp = indicatif[0];
  }

  selectIndicatifDest(event: any) {
    let indicatif = event.target.value;
    indicatif = indicatif.split(" ");
    this.indicatifDest = indicatif[0];
  }

  selectDevise(event: any) {
    this.deviseSelected = event.target.value;
  }

  toStep2() {
    this.getColisDescription();
    if (this.descriptionColis && this.montant && this.voyageSelected) {
      this.isStep1 = false;
      this.isStep2 = true;
      this.isStep3 = false;
      this.progressValue = 60;
    }
  }

  toStep3() {
    if (
      this.colisForm.value["expediteur"] &&
      this.colisForm.value["cinExp"] &&
      (this.colisForm.value["telephoneExp"].length >= 9 ||
        this.colisForm.value["telephoneExp"].length <= 12)
    ) {
      this.isStep1 = false;
      this.isStep2 = false;
      this.isStep3 = true;
      this.progressValue = 100;
    }
  }

  backStep1() {
    this.isStep1 = true;
    this.isStep2 = false;
    this.isStep3 = false;
    this.progressValue = 30;
  }

  backStep2() {
    this.isStep1 = false;
    this.isStep2 = true;
    this.isStep3 = false;
    this.progressValue = 60;
  }

  getColisDescription() {
    if (
      this.descriptionColisTab1Form.value["descriptionp"] &&
      this.descriptionColisTab1Form.value["montantp"] &&
      this.descriptionColisTab1Form.value["poids"]
    ) {
      this.descriptionColis =
        // "(" +
        // this.descriptionColisTab1Form.value["poids"] +
        // "kg" +
        // ")" +
        // " " +
        this.descriptionColisTab1Form.value["descriptionp"];
      this.montant = this.descriptionColisTab1Form.value["montantp"];
    } else {
      this.descriptionColis =
        this.descriptionColisTab2Form.value["descriptionnp"];
      this.montant = this.descriptionColisTab2Form.value["montantnp"];
    }
  }

  changeTab1() {
    this.descriptionColisTab2Form.reset();
  }
  changeTab2() {
    this.descriptionColisTab1Form.reset();
  }

  getUserVoyages() {
    this.connectedUser = this._registerService.getConnectedUser();
    if (this.connectedUser.username) {
      this.voyages$ = this._voyageService.getVoyagesDuGp(
        this.connectedUser.username
      );
    }
    this.pays$ = this._voyageService.getPays();
  }

  initForms() {
    this.descriptionColisTab1Form = this.formBuilder.group({
      descriptionp: [""],
      poids: [""],
      montantp: [""],
    });

    this.descriptionColisTab2Form = this.formBuilder.group({
      descriptionnp: [""],
      montantnp: [""],
    });

    //  declaration colisform
    this.colisForm = this.formBuilder.group({
      voyageDetails: ["", Validators.required],
      paye: [Boolean, Validators.required],
      expediteur: ["", Validators.required],
      cinExp: [""],
      telephoneExp: ["", [Validators.required, Validators.minLength(9)]],
      destinataire: ["", Validators.required],
      cinDest: [""],
      telephoneDest: ["", [Validators.required, Validators.minLength(3)]],
    });
  }
  generateNumberColis() {
    return (
      this.connectedUser.username.substring(0, 2).toUpperCase() +
      "C" +
      Math.round(Math.random() * 50000)
    );
  }
}

// ngOnDestroy() {{}
//   var body = document.getElementsByTagName("body")[0];
//   body.classList.remove("profile-page");
// }
