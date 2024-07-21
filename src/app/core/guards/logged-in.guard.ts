import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { RegisterService } from "src/app/utils/services/register.service";
import { StorageService } from "src/app/utils/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private _resgisterService: RegisterService,
    private _router: Router,
    private _serviceStorqge: StorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._resgisterService.checkIfLoggedIn()) {
      return true;
    }

    this._serviceStorqge.setItem("attemptedRoute", state.url);
    return this._router.parseUrl("/");
  }
}
