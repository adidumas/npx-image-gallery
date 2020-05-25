import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Monument} from "../models/monument";

@Injectable({ providedIn: 'root' })
export class MonumentNavigationService {
  constructor() {}

  private subject = new Subject<any>();

  setPrevNextMonument(selectedMonument: Monument, monuments: Array<Monument>) {
    let prevMonument: Monument = new Monument();
    let nextMonument: Monument = new Monument();

    const indexSelectedMonument = monuments.indexOf(selectedMonument);
    const lastIndex = monuments.length - 1;

    if (lastIndex < 0) {
      prevMonument = selectedMonument;
      nextMonument =  selectedMonument;
    }

    if (lastIndex >= 0 && indexSelectedMonument === -1) {
      prevMonument = monuments[0];
      nextMonument =  monuments[0];
    }

    if (lastIndex >= 0 && indexSelectedMonument >= 0) {
      if (lastIndex === 0) {
        prevMonument = selectedMonument;
        nextMonument =  selectedMonument;
      }
      if (lastIndex > 0) {
        switch(indexSelectedMonument) {
          case 0:
            prevMonument = monuments[lastIndex];
            nextMonument =  monuments[1];
            break;
          case lastIndex:
            prevMonument = monuments[lastIndex - 1];
            nextMonument =  monuments[0];
            break;
          default:
            prevMonument = monuments[indexSelectedMonument - 1];
            nextMonument =  monuments[indexSelectedMonument + 1];
        }
      }
    }

    this.subject.next({ prevMonument: prevMonument, nextMonument: nextMonument });
  }

  clear() {
    this.subject.next({ prevMonument: null, nextMonument: null });
  }

  getPrevNextMonument(): Observable<any> {
    return this.subject.asObservable();
  }
}
