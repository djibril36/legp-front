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
import { RegisterService } from "./register.service";

interface Response {
  data: Entry<Colis>[];
}

@Injectable({
  providedIn: "root",
})
export class ColisService {
  // Définir l'API
  apiURL = "http://localhost:1337/api";
  apiProdURL = "https://strapi-179132-0.cloudclusters.net/api";
  apiColisURL = "https://strapi-179132-0.cloudclusters.net/api/coliss";
  error: HttpErrorResponse;

  constructor(
    private http: HttpClient,
    private _registerService: RegisterService
  ) {}

  /*___SUIVRE UN COLIS VIA NUMBER___*/
  findOneColis(colis_number: string): Observable<Colis> {
    return this.http
      .get<Response>(this.apiColisURL, {
        params: { "filters[numero_colis][$eq]": colis_number },
      })
      .pipe(
        map((response) => {
          const colis = response.data[0]; // Prend le premier élément du tableau
          return colis ? { id: colis.id, ...colis.attributes } : null; // Retourne l'objet Colis ou null s'il n'existe pas
        })
      );
  }

  /*___RECHERCHE COLIS ___*/
  rechercheColis(
    colis_number: string,
    expediteur: string,
    destinataire: string,
    nom_gp: string
  ): Observable<Colis[]> {
    return this.http
      .get<Response>(this.apiColisURL, {
        params: {
          "filters[numero_colis][$contains]": colis_number,
          "filters[expediteur][$contains]": expediteur,
          "filters[destinataire][$contains]": destinataire,
          "filters[nom_gp][$eq]": nom_gp,
        },
      })
      .pipe(
        map((response) =>
          response.data.map((x) => ({ id: x.id, ...x.attributes }))
        )
      );
  }

  createColis(colis: {}): Observable<Colis> {
    return this.http
      .post<Colis>(
        this.apiColisURL,
        colis,
        this._registerService.getAuthHeader()
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Modifier un colis
  updateColis(id: number, colis: Colis): Observable<any> {
    return this.http.put(this.apiColisURL + "/" + id, { data: colis });
  }

  // Récupérer les colis du groupe connecté
  getColisDuGp(nomGp: string): Observable<Colis[]> {
    const params = {
      params: {
        "filters[nom_gp][$eq]": nomGp,
        "filters[etatColis][$ne]": "colis récupéré",
        "sort[0]": "createdAt:desc",
        populate: "*",
      },
    };
    return this.http
      .get<Response>(this.apiColisURL, params)
      .pipe(
        map((response) =>
          response.data.map((x) => ({ id: x.id, ...x.attributes }))
        )
      );
  }

  deleteColis(id: number): Observable<void> {
    const headers = this._registerService.getAuthHeaderDeleting();
    return this.http
      .delete<void>(`${this.apiColisURL}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return throwError(error);
  }
}
