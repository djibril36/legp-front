import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  confirmResult: boolean;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  confirm(): void {
    this.confirmResult = true;
    this.bsModalRef.hide();
  }

  decline(): void {
    this.confirmResult = false;
    this.bsModalRef.hide();
  }
}
