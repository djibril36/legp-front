import { Component, OnInit } from "@angular/core";
import { VoyageService } from "src/app/utils/services/voyage.service";

@Component({
  selector: "app-travelsofweek",
  templateUrl: "./travelsofweek.component.html",
  styleUrls: ["./travelsofweek.component.scss"],
})
export class TravelsofweekComponent implements OnInit {
  Voyages: any = [];
  constructor(public apiVoyage: VoyageService) {}

  ngOnInit(): void {}

  loadVoyages() {
    return this.apiVoyage.getVoyages().subscribe((data: {}) => {
      this.Voyages = data;
      console.log("les donnees trouvees sont " + JSON.stringify(this.Voyages));
    });
  }
}
