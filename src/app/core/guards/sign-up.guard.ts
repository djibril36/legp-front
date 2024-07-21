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

@Injectable({
  providedIn: "root",
})
export class SignupGuard implements CanActivate {
  constructor(
    private _resgisterService: RegisterService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._resgisterService.checkIfLoggedIn()
      ? this._router.parseUrl("/")
      : true;
  }
}
