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
  data: Entry<Bagage>[];
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
        params: { "filters[numero][$eq]": colis_number },
      })
      .pipe(map((response) => response.data.map((x) => x.attributes)));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }
}
