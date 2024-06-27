import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";
import { Utilisateur } from "../models/utilisateur";

interface AuthResponse {
  jwt: string;
  user: Utilisateur;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private url = `${environment.strapiUrl}/auth/local`;
  private loginTracker = new BehaviorSubject(this.checkIfLoggedIn());

  loggedInStatus$ = this.loginTracker.asObservable();

  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) {}

  login(identifier: string, password: string) {
    return this.http.post<AuthResponse>(this.url, { identifier, password });
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
