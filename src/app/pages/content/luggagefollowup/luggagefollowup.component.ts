import { Component, Input, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Colis } from "src/app/utils/models/colis";
import { ColisService } from "src/app/utils/services/colis.service";

@Component({
  selector: "app-luggagefollowup",
  templateUrl: "./luggagefollowup.component.html",
  styleUrls: ["./luggagefollowup.component.scss"],
})
export class LuggagefollowupComponent implements OnInit {
  isCollapsed = true;
  colis$: Observable<Colis | null> = of(null);
  numero_colis: string = "";
  isNotColisFounded: boolean = false; // pour un numero de colis incorrect

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor(public _colisService: ColisService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.numero_colis = null;
    this.isNotColisFounded = false;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  // vider tout pour une nouvelle recherche
  remove() {
    this.numero_colis = null;
    this.colis$ = null;
    this.isNotColisFounded = false;
  }

  displayLuggage() {
    if (this.numero_colis) {
      this.colis$ = this._colisService.findOneColis(this.numero_colis).pipe(
        tap((colis) => {
          // Le code à l'intérieur de `tap` s'exécute après que `findOneColis` a émis une valeur
          this.isNotColisFounded = !colis; // Si `colis` est `null`, on set `isNotColisFounded` à `true`
          // this.isSearched = true;
        }),
        catchError(() => {
          this.isNotColisFounded = true; // En cas d'erreur, on set `isNotColisFounded` à `true`
          // this.isSearched = true;
          return of(null);
        })
      );
    }
  }

  findColis() {
    this.colis$ = this._colisService.findOneColis(this.numero_colis).pipe(
      catchError(() => {
        // Si une erreur survient, retourne `null` pour indiquer qu'aucun colis n'a été trouvé

        return of(null);
      })
    );
  }

  countStar(star) {
    this.selectedValue = star;
  }
}
