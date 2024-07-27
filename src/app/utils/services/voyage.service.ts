import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Voyage } from "../models/voyage";
import { Observable, of, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { Entry } from "../models/entry";
import { Pays } from "../models/pays";
import { RegisterService } from "./register.service";

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
  private apiProdURL = "https://strapi-179132-0.cloudclusters.net/api";
  private apiProdURLVoyages =
    "https://strapi-179132-0.cloudclusters.net/api/voyages";
  error: HttpErrorResponse;
  params: {};
  constructor(
    private http: HttpClient,
    private _registerService: RegisterService
  ) {}

  // Voyages list pour les clients
  getVoyages(): Observable<Voyage> {
    return this.http
      .get<Voyage>(this.apiProdURL + "/voyages")
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
      .get<responseVoyage>(this.apiProdURLVoyages, this.params)
      .pipe(
        map((response) =>
          response.data.map((x) => ({ id: x.id, ...x.attributes }))
        )
      );
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
      .get<responseVoyage>(this.apiProdURLVoyages, this.params)
      .pipe(
        map((response) =>
          response.data.map((x) => ({ id: x.id, ...x.attributes }))
        )
      );
  }

  // recupere les voyages du Gp connecté
  getVoyagesDuGp(nomGp) {
    const params = {
      params: {
        "filters[nom_gp][$eq]": nomGp,
        populate: "*",
      },
    };
    return this.http
      .get<responseVoyage>(this.apiProdURLVoyages, params)
      .pipe(
        map((response) =>
          response.data.map((x) => ({ id: x.id, ...x.attributes }))
        )
      );
  }

  getPays(): Observable<Pays[]> {
    return this.http.get<responsePays>(this.apiProdURL + "/payss").pipe(
      map((response) => response.data.map((x) => x.attributes)),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }

  // Fetch voyage
  getVoyage(id: any): Observable<Voyage> {
    return this.http
      .get<Voyage>(this.apiProdURLVoyages + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Voyage
  createVoyage(Voyage: {}): Observable<Voyage> {
    return this.http
      .post<Voyage>(
        this.apiProdURLVoyages,
        Voyage,
        this._registerService.getAuthHeader()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  updateVoyage(voyage: Voyage): Observable<Voyage> {
    return this.http.put(this.apiProdURLVoyages + "/" + voyage.id, {
      data: voyage,
    });
  }

  deleteVoyage(id: number): Observable<void> {
    const headers = this._registerService.getAuthHeaderDeleting();
    return this.http
      .delete<void>(`${this.apiProdURLVoyages}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
