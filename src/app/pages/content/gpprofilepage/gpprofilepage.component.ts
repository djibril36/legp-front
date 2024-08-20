import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Chart from "chart.js";
import { DateFormatter } from "ngx-bootstrap/datepicker";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { RegisterService } from "src/app/utils/services/register.service";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { DEFAULT_STATUT } from "src/app/utils/constantes/constantes";
import { Observable } from "rxjs";
import { Voyage } from "src/app/utils/models/voyage";
import { Pays } from "src/app/utils/models/pays";

@Component({
  selector: "app-gpprofilepage",
  templateUrl: "./gpprofilepage.component.html",
  styleUrls: ["./gpprofilepage.component.scss"],
})
export class GpprofilepageComponent implements OnInit {
  focus3: boolean;
  erroMessage: any;
  isCollapsed = true;
  submitted = false;
  controlValid = false;
  httpOptions: {};
  currentToken: string;
  selectedDevise: string;
  minDate = new Date();
  voyageForm: FormGroup;
  connectedUser: Utilisateur;
  pays$: Observable<Pays[]> | undefined;
  voyages$: Observable<Voyage[]> | undefined;

  constructor(
    private _registerService: RegisterService,
    private formBuilder: FormBuilder,
    private _voyageService: VoyageService,
    private _router: Router
  ) {}

  ngOnInit() {
    // information du gp connecté
    this.currentToken = this._registerService.getPersistedToken();
    this.getUserVoyages();
    this.initVoyageForm();
    this.initGraphes();
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.currentToken}`,
      }),
    };
  }

  getUserVoyages() {
    this.pays$ = this._voyageService.getPays();
    this.connectedUser = this._registerService.getConnectedUser();
    if (this.connectedUser.username) {
      this.voyages$ = this._voyageService.getVoyagesDuGp(
        this.connectedUser.username
      );
    }
  }

  publierVoyage() {
    this.submitted = true;
    this.controlValid = this.inputControl();
    // si la saisie est valide
    if (this.controlValid) {
      const newVoyage = this.addVoyageData();
      this._voyageService.createVoyage(newVoyage).subscribe({
        next: () => {
          this.voyageForm.reset();
          this._router.navigateByUrl("/gp-managetrip");
        },
        error: (error) => {
          this.erroMessage = error;
        },
      });
    }
  }

  addVoyageData() {
    const idVoyage = this.generateIdVoyage(this.connectedUser.username);
    const dateVoyage = new Date(this.voyageForm.value["date_voyage"]);
    const semaineVoyage = this.getWeekNumber(dateVoyage); // Récupération de la semaine
    const newVoyage = {
      data: {
        id_voyage: idVoyage,
        date_voyage: this.voyageForm.value["date_voyage"],
        ville_depart: this.voyageForm.value["depart"].toUpperCase(),
        ville_arrivee: this.voyageForm.value["arrivee"].toUpperCase(),
        kilo_dispo: this.voyageForm.value["kg_disponible"] || 100,
        tarif: this.voyageForm.value["tarif"],
        devise: this.selectedDevise,
        nom_gp: this.connectedUser.username,
        semaine: semaineVoyage,
        commentaire: this.voyageForm.value["commentaire"] || " ",
        nombre_de_colis: 0,
        voyage_statut: DEFAULT_STATUT,
        encaisse: 0,
        poids_colis: 0,
      },
    };
    return newVoyage;
  }

  get f() {
    return this.voyageForm.controls;
  }

  generateIdVoyage(gpName) {
    return (
      "T" +
      gpName.substring(0, 3).toUpperCase() +
      "R" +
      +Math.round(Math.random() * 50000)
    );
  }

  getWeekNumber(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor(
      (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  }
  selectDevise(event: Event) {
    this.selectedDevise = (event.target as HTMLSelectElement).value;
  }

  inputControl() {
    if (
      this.voyageForm.value["depart"] != null &&
      this.voyageForm.value["arrivee"] != null &&
      this.voyageForm.value["date_voyage"] != null &&
      this.voyageForm.value["tarif"] != null &&
      this.voyageForm.value["devise"] != null
    ) {
      return true;
    }
  }

  initVoyageForm() {
    // voyage form
    this.voyageForm = this.formBuilder.group({
      depart: ["", Validators.required],
      arrivee: ["", Validators.required],
      date_voyage: ["", Validators.required],
      tarif: ["", Validators.required],
      devise: ["", Validators.required],
      kg_disponible: [""],
      commentaire: [""],
    });
  }

  initGraphes() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    var canvas: any = document.getElementById("chartBig");
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");
    var chartBig = new Chart(ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: [
          "Jan",
          "Fev",
          "Mar",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Aout",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Colis",
            fill: true,
            backgroundColor: gradientFill,
            borderColor: "#e44cc4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#e44cc4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#be55ed",
            //pointHoverBorderColor:'rgba(35,46,55,1)',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: [80, 160, 200, 160, 250, 280, 220, 190, 200, 250, 290, 320],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },

        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#ccc",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0,0.0)",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 350,
                padding: 20,
                fontColor: "#9a9a9a",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0,0)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a",
              },
            },
          ],
        },
      },
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
