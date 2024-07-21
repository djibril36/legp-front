import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject,
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { RegisterService } from "./utils/services/register.service";
import { Utilisateur } from "./utils/models/utilisateur";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    public location: Location,
    private _registerService: RegisterService,
    @Inject(DOCUMENT) document
  ) {}
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    let currentUser: Utilisateur = this._registerService.getConnectedUser();
    this.onWindowScroll(event);
    let context = this;
    window.addEventListener("beforeunload", function (e) {
      if (currentUser) {
        context.logoutOnClose();
      }
    });
  }

  logoutOnClose() {
    this._registerService.logout();
  }
}
