import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-client-trip",
  templateUrl: "./client-trip.component.html",
  styleUrls: ["./client-trip.component.scss"],
})
export class ClientTripComponent implements OnInit {
  isCollapsed = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  date: any;
  constructor() {}

  ngOnInit(): void {}
}
