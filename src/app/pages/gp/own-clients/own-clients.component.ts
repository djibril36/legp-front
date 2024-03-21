import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-own-clients",
  templateUrl: "./own-clients.component.html",
  styleUrls: ["./own-clients.component.scss"],
})
export class OwnClientsComponent implements OnInit {
  isCollapsed = true;
  constructor() {}

  ngOnInit(): void {}
}
