import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Utilisateur } from "../models/utilisateur";
import { StorageService } from "./storage.service";
import { catchError } from "rxjs/operators";

interface AuthResponse {
  jwt: string;
  user: Utilisateur;
}

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  error: any | undefined;
  private url = `http://localhost:1337/api/auth/local`;
  private loginTracker = new BehaviorSubject(this.checkIfLoggedIn());

  loggedInStatus$ = this.loginTracker.asObservable();

  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) {}

  // CREATION D'UN NOUVEAU USER GP
  // async createGp(utilisateur) {
  //   this.http
  //     .post(this.apiURL, {
  //       data: {
  //         nom: utilisateur.nom,
  //         prenom: utilisateur.prenom,
  //         email: utilisateur.email,
  //         password: utilisateur.password,
  //         nom_gp: utilisateur.nom_gp,
  //       },
  //     })
  //     .pipe(catchError((error) => this.handleError(error)))
  //     .subscribe((response) => {
  //       console.log("resgisterData" + JSON.stringify(response));
  //     });
  // }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  login(identifier: string, password: string) {
    return this.http.post<AuthResponse>(this.url, { identifier, password });
    // .pipe(catchError((error) => this.handleError(error)))
    //   .subscribe((response) => {
    //     console.log("resgisterData" + JSON.stringify(response));
    //   });;
  }

  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.url}/register`, {
      username,
      email,
      password,
    });
  }

  checkIfLoggedIn() {
    return this._storageService.getItem("loggedIn") === "true";
  }

  persistUser(resp: AuthResponse) {
    [
      ["userId", resp.user.id],
      ["userEmail", resp.user.email],
      ["username", resp.user.username],
      ["loggedIn", "true"],
      ["token", resp.jwt],
    ].forEach((item) => this._storageService.setItem(item[0], item[1]));
    this.loginTracker.next(true);
  }

  getPersistedUser(): Utilisateur {
    return {
      id: this._storageService.getItem("userId") || "",
      username: this._storageService.getItem("username") || "",
      email: this._storageService.getItem("userEmail") || "",
    };
  }

  getPersistedToken(): string {
    return this._storageService.getItem("token") || "";
  }

  logout() {
    ["userId", "userEmail", "username", "loggedIn", "token"].forEach((item) =>
      this._storageService.removeItem(item)
    );
    this.loginTracker.next(false);
  }

  getAuthHeader() {
    return {
      headers: { Authorization: `Bearer ${this.getPersistedToken()}` },
    };
  }
}
