import {InjectionToken} from "@angular/core";

export const AngularTestidOptionsInjectionToken = new InjectionToken<TestidOptions>("Dev provided options");

export const DEFAULT_TAG = "testid";

export type TestidOptions = {
  //tag that is rendered if feature is enabled. Default:testid
  tag: string
  //if set to true, test tags will always be rendered. If false, LocalStorage content will enable/disable the directive
  enabledByDefault: boolean,
  //key that is inspected in the LocalStorage to enable/disable test tags. Default: "testid"
  enableKey: string
  //if this value is present under `enableKey` key in LocalStorage, tags will be rendered into the DOM. Different value or absense of it, disables tags. Default: "true"
  enableValue: string
}

export const DEFAULT_OPTIONS: TestidOptions = {
  tag: DEFAULT_TAG,
  enabledByDefault: false,
  enableKey: "testid",
  enableValue: "true"
}

