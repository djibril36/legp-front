import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"],
})
export class RatingComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  ngOnInit(): void {}

  countStar(star) {
    this.selectedValue = star;
    console.log("Value of star", star);
  }
}
