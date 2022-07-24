import {ModuleWithProviders, NgModule} from '@angular/core';
import {AngularTestidDirective} from './angular-testid.directive';
import {AngularTestidOptionsInjectionToken, DEFAULT_OPTIONS, TestidOptions} from "./angular-testid.model";


@NgModule({
  declarations: [AngularTestidDirective],
  exports: [AngularTestidDirective],
  providers: [
    {provide: AngularTestidOptionsInjectionToken, useValue: DEFAULT_OPTIONS}
  ]
})
export class AngularTestidModule {
  static with(opts: Partial<TestidOptions>): ModuleWithProviders {
    return {
      ngModule: AngularTestidModule,
      providers: [{
        provide: AngularTestidOptionsInjectionToken, useValue: {...DEFAULT_OPTIONS, ...opts}
      }]
    }
  }
}

