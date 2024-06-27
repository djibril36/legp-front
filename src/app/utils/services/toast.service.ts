import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}

  show(text: string, options: any = {}) {
    this.toasts.push({ text, ...options });
  }

  showDanger(text: string, options: any = {}) {
    this.toasts.push({
      text,
      classname: "bg-danger text-light",
      header: "Error",
      ...options,
    });
  }

  showWarning(text: string, options: any = {}) {
    this.toasts.push({
      text,
      classname: "bg-warning text-dark",
      header: "Warning",
      ...options,
    });
  }

  showSuccess(text: string, options: any = {}) {
    this.toasts.push({
      text,
      classname: "bg-success text-light",
      header: "Success",
      ...options,
    });
  }

  showPrimary(text: string, options: any = {}) {
    this.toasts.push({ text, classname: "bg-primary text-light", ...options });
  }

  showInfo(text: string, options: any = {}) {
    this.toasts.push({
      text,
      classname: "bg-info text-light",
      header: "Info",
      ...options,
    });
  }

  showDark(text: string, options: any = {}) {
    this.toasts.push({ text, classname: "bg-dark text-light", ...options });
  }
}
