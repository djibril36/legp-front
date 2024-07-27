import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
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
  colis$: Observable<Colis> | undefined;
  numero_colis: string = "";
  isErrornum: boolean; // pour un numero de colis incorrect

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(public _colisService: ColisService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.numero_colis = null;
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
    this.colis$ = this._colisService.findOneColis(this.numero_colis);
    this.colis$.subscribe((response) => {
      let luggage: Colis;
      luggage = response;
      if (luggage) {
        this.isErrornum = true;
      }
      if (luggage && this.colis$ != null) {
        this.luggage_founded = true;
        this.numero_colis = null;
      }
    });
  }

  countStar(star) {
    this.selectedValue = star;
  }
}
