import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Utilisateur } from "../models/utilisateur";
import { StorageService } from "./storage.service";
import { AuthResponse } from "../models/auth-response";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  error: any | undefined;
  private url = `http://localhost:1337/api/auth/local`;
  private apiProdURL =
    "https://strapi-179132-0.cloudclusters.net/api/auth/local";

  private loginTracker = new BehaviorSubject(this.checkIfLoggedIn());
  loggedInStatus$ = this.loginTracker.asObservable();
  AuthResponse: Observable<AuthResponse>;

  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error.message;
    return of();
  }

  login(identifier: string, password: string) {
    return this.http
      .post<AuthResponse>(this.apiProdURL, { identifier, password })
      .pipe((response) => (this.AuthResponse = response));
  }

  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiProdURL}/register`, {
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

  getConnectedUser(): Utilisateur {
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
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getPersistedToken()}`,
      }),
    };
  }
}
