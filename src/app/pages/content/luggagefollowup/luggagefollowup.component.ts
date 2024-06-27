import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Bagage } from "src/app/utils/models/bagage";
import { Colis } from "src/app/utils/models/colis";
import { ColisService } from "src/app/utils/services/colis.service";

@Component({
  selector: "app-luggagefollowup",
  templateUrl: "./luggagefollowup.component.html",
  styleUrls: ["./luggagefollowup.component.scss"],
})
export class LuggagefollowupComponent implements OnInit {
  isCollapsed = true;
  luggage_founded = false;
  colis$: Observable<Colis[]> | undefined;
  bagage: Bagage;
  numero_colis: string = "";
  isErrornum: boolean; // pour un numero de colis incorrect

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(public apiColis: ColisService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.numero_colis = null;
    this.bagage = null;
    this.luggage_founded = false;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  // vider tout pour une nouvelle recherche
  remove() {
    this.luggage_founded = false;
    this.isErrornum = null;
    this.numero_colis = null;
    this.colis$ = null;
  }

  displayLuggage() {
    this.colis$ = this.apiColis.findOneColis(this.numero_colis);
    this.colis$.subscribe((response) => {
      let luggage: Colis[];
      luggage = response;
      let tlug: number = luggage.length;
      if (tlug == 0) {
        this.isErrornum = true;
      }
      if (tlug > 0 && this.colis$ != null) {
        this.luggage_founded = true;
      }
    });
  }

  countStar(star) {
    this.selectedValue = star;
    console.log("Value of star", star);
  }
}
