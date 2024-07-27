import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UpdateluggageComponent } from "src/app/pages/gp/updateluggage/updateluggage.component";
import { ConfirmationDialogComponent } from "../dialog/confirmation-dialog/confirmation-dialog.component";
import { Observable } from "rxjs";
import { UpdateVoyageComponent } from "src/app/pages/gp/updatevoyage/updatevoyage.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openEditModal(colis: any) {
    const initialState = { colis };
    this.bsModalRef = this.modalService.show(UpdateluggageComponent, {
      initialState,
    });
    return this.bsModalRef.content.onClose;
  }

  openEditVoyageModal(voyage: any) {
    const initialState = { voyage };
    this.bsModalRef = this.modalService.show(UpdateVoyageComponent, {
      initialState,
    });
    return this.bsModalRef.content.onClose;
  }

  confirm(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "lg" = "sm"
  ): Observable<boolean> {
    const initialState = {
      title,
      message,
      btnOkText,
      btnCancelText,
    };
    this.bsModalRef = this.modalService.show(ConfirmationDialogComponent, {
      initialState,
      class: "modal-" + dialogSize,
    });
    return new Observable<boolean>((observer) => {
      const subscription = this.bsModalRef.onHidden.subscribe(() => {
        observer.next(this.bsModalRef.content.confirmResult);
        observer.complete();
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        },
      };
    });
  }
}
