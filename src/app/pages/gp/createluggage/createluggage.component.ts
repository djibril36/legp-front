import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-createluggage",
  templateUrl: "./createluggage.component.html",
  styleUrls: ["./createluggage.component.scss"],
})
export class CreateluggageComponent implements OnInit {
  isCollapsed = true;
  isStep1: boolean = true;
  isStep2: boolean = false;
  isStep3: boolean = false;
  progressValue: number;

  constructor() {}

  ngOnInit() {
    this.isStep1 = true;
    this.isStep2 = false;
    this.isStep3 = false;
    this.progressValue = 30;
    // var body = document.getElementsByTagName("body")[0];
    // body.classList.add("profile-page");
  }

  toStep2() {
    this.isStep1 = false;
    this.isStep2 = true;
    this.isStep3 = false;
    this.progressValue = 60;
  }
  toStep3() {
    this.isStep1 = false;
    this.isStep2 = false;
    this.isStep3 = true;
    this.progressValue = 100;
  }

  backStep1() {
    this.isStep1 = true;
    this.isStep2 = false;
    this.isStep3 = false;
    this.progressValue = 30;
  }
  backStep2() {
    this.isStep1 = false;
    this.isStep2 = true;
    this.isStep3 = false;
    this.progressValue = 60;
  }

  // ngOnDestroy() {
  //   var body = document.getElementsByTagName("body")[0];
  //   body.classList.remove("profile-page");
  // }
}
