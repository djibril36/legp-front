import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberFormatter",
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return "";
    }

    // Convert the number to a string and manually add spaces as thousand separators
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
