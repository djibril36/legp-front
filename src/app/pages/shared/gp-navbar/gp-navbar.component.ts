import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gp-navbar",
  templateUrl: "./gp-navbar.component.html",
  styleUrls: ["./gp-navbar.component.scss"],
})
export class GpNavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
