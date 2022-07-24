import {OnDestroy} from "@angular/core";
import {Subject} from "rxjs";


export class NgDestroy implements OnDestroy {
  private onDestroySubject = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

  get onDestroy() {
    return this.onDestroySubject.asObservable();
  }
}
