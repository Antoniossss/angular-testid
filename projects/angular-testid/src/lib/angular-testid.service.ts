import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject} from "rxjs";
import {AngularTestidOptionsInjectionToken, TestidOptions} from "./angular-testid.model";
import {distinctUntilChanged} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AngularTestidService {

  private $isEnabled: Subject<boolean>;

  constructor(
    @Inject(AngularTestidOptionsInjectionToken) private injectedConfig: TestidOptions
  ) {
    this.$isEnabled = new BehaviorSubject<boolean>(injectedConfig.enabledByDefault || this.isEnabledBySessionStorage());
    fromEvent(window, "storage").subscribe(event => {
      this.$isEnabled.next(this.injectedConfig.enabledByDefault || this.isEnabledBySessionStorage());
    })
    this.isEnabled.pipe(distinctUntilChanged()).subscribe(v => console.log("Test tags enabled:", v));
  }

  get isEnabled() {
    return this.$isEnabled.asObservable();
  }


  private isEnabledBySessionStorage() {
    return localStorage.getItem(this.injectedConfig.enableKey) == this.injectedConfig.enableValue;
  }
}


