import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { formatDate } from "ngx-bootstrap/chronos";
import { Voyage } from "src/app/utils/models/voyage";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-gpsearchpage",
  templateUrl: "./gpsearchpage.component.html",
  styleUrls: ["./gpsearchpage.component.scss"],
})
export class GpsearchpageComponent implements OnInit {
  [x: string]: any;
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  focus3;

  // GESTION DONNEES FORMULAIRES
  @ViewChild("departs") departs!: ElementRef;
  @ViewChild("arrivees") arrivees!: ElementRef;
  @ViewChild("date") dates!: ElementRef;
  selectedDepart: string;
  selectedArrivee: string;
  selectedDate: any;
  sendedDate: any;
  minDate = new Date();
  weekNumber: number;

  isSenegal: boolean = false;
  isMaroc: boolean = false;
  ville_depart: "";

  // GESTION RETOUR API SUITE RECHERCHE
  Voyages: any = [];
  error: any | undefined;
  voyages$: Observable<Voyage[]> | undefined;
  displayResult: boolean;
  isErrornum: boolean;
  voyage_founded: boolean;

  constructor(public apiVoyage: VoyageService) {}
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.selectedDepart = null;
    this.selectedArrivee = null;
    this.selectedDate = null;
    this.sendedDate = null;
    this.displayResult = false;

    // this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  /*___RECUPERATION DES INPUTS DU FORMULAIRE___*/
  SelectedDepart(value: string): void {
    this.selectedDepart = this.departs.nativeElement.value;
  }

  SelectedArrivees(value: string): void {
    this.selectedArrivee = this.arrivees.nativeElement.value;
  }

  getDate(dateV: Date) {
    this.selectedDate = formatDate(dateV, "DD-MM-YYYY");
    this.sendedDate = formatDate(dateV, "YYYY-MM-DD");
    this.weekNumber = parseInt(formatDate(dateV, "w"));
  }

  /**_______RECHERCHER UN VOYAGE DATE-DEPART-ARRIVEE ______ */
  findVoyages() {
    if (this.selectedDepart == null || this.selectedArrivee == null) {
      console.log("aucune date choisie");
    }

    if (this.SelectedDepart != null && this.selectedArrivee != null) {
      this.voyages$ = this.apiVoyage.findVoyages(
        this.selectedDepart,
        this.selectedArrivee,
        this.sendedDate
      );
      this.voyages$.subscribe((response) => {
        console.log("response " + response);
        let voyages: Voyage[];
        voyages = response;
        let tvoy: number = voyages.length;
        if (tvoy > 0 && this.voyages$ != null) {
          this.voyage_founded = true;
          this.displayResult = true;
        }
        if (tvoy == 0) {
          this.isErrornum = true;
          console.log("AUCUN VOYAGE TROUVE");
          this.findVoyagesOfWeek();
        }
      });
    }
  }

  /**_______RECHERCHER UN VOYAGE SEMAINE-DEPART-ARRIVEE
   * SI AUCUN VOYAE EST TROUVEE A LA DATRE SOUHAITEE ______ */
  findVoyagesOfWeek() {
    this.voyages$ = this.apiVoyage.findVoyagesOfWeek(
      this.selectedDepart,
      this.selectedArrivee,
      this.weekNumber
    );
    this.voyages$.subscribe((response) => {
      console.log("response " + response);
      let voyages: Voyage[];
      voyages = response;
      let tvoy: number = voyages.length;
      if (tvoy == 0) {
        this.isErrornum = true;
        console.log("AUCUN VOYAGE TROUVE");
      }
      if (tvoy > 0 && this.voyages$ != null) {
        this.voyage_founded = true;
        this.displayResult = true;
      }
    });
  }

  goSearch() {
    this.displayResult = false;
  }

  /****______________________ ANIMATION ET MISE EN PAGE _______________________*****/
  // @HostListener("document:mousemove", ["$event"])
  // onMouseMove(e) {
  //   var squares1 = document.getElementById("square1");
  //   var squares2 = document.getElementById("square2");
  //   var squares3 = document.getElementById("square3");
  //   var squares4 = document.getElementById("square4");
  //   var squares5 = document.getElementById("square5");
  //   var squares6 = document.getElementById("square6");
  //   var squares7 = document.getElementById("square7");
  //   var squares8 = document.getElementById("square8");

  //   var posX = e.clientX - window.innerWidth / 2;
  //   var posY = e.clientY - window.innerWidth / 6;

  //   squares1.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares2.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares3.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares4.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares5.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares6.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares7.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.02 +
  //     "deg) rotateX(" +
  //     posY * -0.02 +
  //     "deg)";
  //   squares8.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.02 +
  //     "deg) rotateX(" +
  //     posY * -0.02 +
  //     "deg)";
  // }

  getGpcontact(i) {
    console.log("index " + i);
    let nomGp = this.voyages$[i];
    console.log("nomGP " + nomGp);
  }
}
