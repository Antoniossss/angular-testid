import {TestBed} from "@angular/core/testing";
import {AngularTestidModule} from "./angular-testid.module";
import {AngularTestidService} from "./angular-testid.service";
import {AngularTestidOptionsInjectionToken, TestidOptions} from "./angular-testid.model";

describe("AngularTestId module", () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
  })
  it('is disabled by default', async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularTestidModule
      ]
    }).compileComponents();
    const config = (TestBed.get(AngularTestidOptionsInjectionToken) as TestidOptions)
    expect(config.enabledByDefault).toBeFalsy();
    expect(config.tag).toEqual("testid");
  });
  it('can have customized default state', (done) => {
    TestBed.configureTestingModule({
      imports: [
        AngularTestidModule.with({
          enabledByDefault: true
        })
      ]
    }).compileComponents();
    (TestBed.get(AngularTestidService) as AngularTestidService).isEnabled.subscribe(v => {
      expect(v).toBeTruthy()
      done();
    });
  })

})
