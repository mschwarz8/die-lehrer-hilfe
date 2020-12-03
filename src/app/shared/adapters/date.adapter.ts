import { NativeDateAdapter } from '@angular/material/core';

export const DELIMITER_COMMA = ',';
export const DELIMITER_DOT = '.';
export const DELIMITER_SLASH = '/';
export const NO_DELIMITER_REGEX = '.{1,2}';
export const NO_DELIMITER_FLAG = 'g';

export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if (typeof value === 'string') {
      const dateArray = this.splitValue(value);
      if (dateArray) {
        const year = Number(dateArray[2]);
        const month = Number(dateArray[1]) - 1;
        const date = Number(dateArray[0]);
        return new Date(year, month, date);
      }
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return this.toDoubleDigit(day) + DELIMITER_DOT + this.toDoubleDigit(month) + DELIMITER_DOT + year;
    } else if (displayFormat === 'inputMonth') {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return this.toDoubleDigit(month) + DELIMITER_DOT + year;
    } else {
      return date.toDateString();
    }
  }

  private splitValue(value: string): string[] {
    if (value.indexOf(DELIMITER_COMMA) > -1) {
      return value.split(DELIMITER_COMMA);
    } else if (value.indexOf(DELIMITER_DOT) > -1) {
      return value.split(DELIMITER_DOT);
    } else if (value.indexOf(DELIMITER_SLASH) > -1) {
      return value.split(DELIMITER_SLASH);
    } else if (value.length === 8 && !isNaN(Number(value))) {
      const resultArray = [];
      const tempArray = value.match(new RegExp(NO_DELIMITER_REGEX, NO_DELIMITER_FLAG));
      resultArray.push(tempArray[0]);
      resultArray.push(tempArray[1]);
      resultArray.push(tempArray[2] + tempArray[3]);
      return resultArray;
    }
    return null;
  }

  private toDoubleDigit(zahl: number): string {
    return ('00' + zahl).slice(-2);
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'inputMonth',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};
