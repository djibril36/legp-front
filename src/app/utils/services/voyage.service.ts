import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Voyage } from "../models/voyage";
import { Observable, of, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { Entry } from "../models/entry";
import { StorageService } from "./storage.service";
import { RegisterService } from "./register.service";
import { Pays } from "../models/pays";

interface responseVoyage {
  data: Entry<Voyage>[];
}

interface responsePays {
  data: Entry<Pays>[];
}

@Injectable({
  providedIn: "root",
})
export class VoyageService {
  // Define API
  apiURL = "http://localhost:1337/api";
  error: HttpErrorResponse;
  params: {};
  constructor(
    private http: HttpClient,
    private _registerService: RegisterService
  ) {}

  // => Fetch Voyages list pour les clients
  getVoyages(): Observable<Voyage> {
    return this.http
      .get<Voyage>(this.apiURL + "/voyages")
      .pipe(retry(1), catchError(this.handleError));
  }

  // trouver un voyage avec des parametres de recherches depart arrivee et date
  findVoyages(villeDepot: string, villeRetrait: string, dateDepart: any) {
    this.params = {
      params: {
        "filters[villeDepot][$eq]": villeDepot,
        "filters[villeRetrait][$eq]": villeRetrait,
        "filters[dateDepart][$eq]": dateDepart,
        populate: "*",
      },
    };

    return this.http
      .get<responseVoyage>(this.apiURL + "/voyages", this.params)
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  // trouver les autres voyages de la semaine avec des parametres de recherches depart arrivee et date
  findVoyagesOfWeek(villeDepot: string, villeRetrait: string, week: number) {
    this.params = {
      params: {
        "filters[villeDepot][$eq]": villeDepot,
        "filters[villeRetrait][$eq]": villeRetrait,
        "filters[numeroSemaine][$eq]": week,
        populate: "*",
      },
    };

    return this.http
      .get<responseVoyage>(this.apiURL + "/voyages", this.params)
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  // recupere les voyages du Gp connecté
  getVoyagesDuGp(nomGp) {
    const params = {
      params: {
        "filters[nomGp][$eq]": nomGp,
        populate: "*",
      },
    };
    return this.http
      .get<responseVoyage>(this.apiURL + "/voyages", params)
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  getPays(): Observable<Pays[]> {
    return this.http.get<responsePays>(this.apiURL + "/payss").pipe(
      map((response) => response.data.map((x) => x.attributes)),
      catchError(this.handleError)
    );
    // .pipe(retry(1), catchError(this.handleError));
  }

  /** return this.http
  .get<Response>(this.apiURL + "/coliss", {
    params: { "filters[numero][$eq]": colis_number },
  })
  .pipe(map((response) => response.data.map((x) => x.attributes)));
}*/

  handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }

  // Fetch voyage
  getVoyage(id: any): Observable<Voyage> {
    return this.http
      .get<Voyage>(this.apiURL + "/voyages/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Voyage
  createVoyage(Voyage: {}, headers: {}): Observable<Voyage> {
    return this.http
      .post<Voyage>(this.apiURL + "/voyages", Voyage, headers)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Voyage
  updateVoyage(id: any, Voyage: any, headers: {}): Observable<Voyage> {
    return this.http
      .put<Voyage>(
        this.apiURL + "/voyages/" + id,
        JSON.stringify(Voyage),
        headers
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Voyage
  deleteVoyage(id: any, headers) {
    return this.http
      .delete<Voyage>(this.apiURL + "/Voyages/" + id, headers)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  // handleError(error: any) {
  //   let errorMessage = "";
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }
}
