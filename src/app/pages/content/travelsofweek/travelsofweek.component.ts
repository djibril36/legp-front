import { Component, OnInit, ViewChild } from "@angular/core";
import { VoyageService } from "src/app/utils/services/voyage.service";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-travelsofweek",
  templateUrl: "./travelsofweek.component.html",
  styleUrls: ["./travelsofweek.component.scss"],
})
export class TravelsofweekComponent implements OnInit {
  Voyages: any = []; // Variable qui contiendra la liste des voyages
  selectedVoyage: any;

  // Utiliser @ViewChild pour référencer le modal
  @ViewChild("myModal1", { static: false }) myModal1: ModalDirective;

  constructor(public apiVoyage: VoyageService) {}

  ngOnInit(): void {
    this.loadVoyages();
  }

  loadVoyages() {
    this.apiVoyage.getVoyages().subscribe(
      (voyages) => {
        this.Voyages = voyages; // Stocker les résultats dans la variable Voyages
      },
      (error) => {
        console.error(error); // Gestion d'erreur
      }
    );
  }

  showContact(voyage: any) {
    this.selectedVoyage = voyage;
    if (this.myModal1) {
      this.myModal1.show(); // Afficher le modal si la référence existe
    } else {
      console.error("Modal not found");
    }
  }
}
