import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Colis } from "../models/colis";
import { Observable, of, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { Entry } from "../models/entry";
import { Bagage } from "../models/bagage";

interface Response {
  data: Entry<Colis>[];
}

@Injectable({
  providedIn: "root",
})
export class ColisService {
  // Define API
  apiURL = "http://localhost:1337/api";
  error: HttpErrorResponse;

  constructor(private http: HttpClient) {}

  /*___SUIVRE UN COLIS VIA NUMBER___*/
  findOneColis(colis_number: string) {
    return this.http
      .get<Response>(this.apiURL + "/coliss", {
        params: { "filters[numero_colis][$eq]": colis_number },
      })
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  /*___RECHERCHE COLIS __*/
  rechercheColis(
    colis_number: string,
    expediteur: string,
    destinataire: string,
    nom_gp: string
  ) {
    return this.http
      .get<Response>(this.apiURL + "/coliss", {
        params: {
          "filters[numero_colis][$contains]": colis_number,
          "filters[expediteur][$contains]": expediteur,
          "filters[destinataire][$contains]": destinataire,
          "filters[nom_gp][$eq]": nom_gp,
        },
      })
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  createColis(Colis: {}, headers: {}): Observable<Colis> {
    return this.http
      .post<Colis>(this.apiURL + "/coliss", Colis, headers)
      .pipe(retry(1), catchError(this.handleError));
  }

  // recupere les colis du Gp connecté
  getColisDuGp(nomGp) {
    const params = {
      params: {
        "filters[nom_gp][$eq]": nomGp,
        "filters[etatColis][$ne]": "recupere",
        populate: "*",
      },
    };
    return this.http
      .get<Response>(this.apiURL + "/coliss", params)
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }
}
