import {Directive, ElementRef, Host, Inject, Input, Renderer2} from '@angular/core';
import {NgDestroy} from './ngDestroy';
import {AngularTestidService} from './angular-testid.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AngularTestidOptionsInjectionToken, DEFAULT_TAG, TestidOptions} from './angular-testid.model';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[testId]',
})
export class AngularTestidDirective extends NgDestroy {
  private $contentSubject = new Subject<string>();
  private renderer: BoundRenderer;

  @Input('testId')
  set content(content: string) {
    this.$contentSubject.next(content);
  }

  constructor(@Host() private host: ElementRef,
              @Inject(AngularTestidOptionsInjectionToken) private options: TestidOptions,
              private service: AngularTestidService,
              r: Renderer2
  ) {
    super();
    this.renderer = new BoundRenderer(this.host, r);
    combineLatest([this.service.isEnabled, this.$contentSubject])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(r => this.update(r[0], r[1]));
  }

  private update(flag: boolean, content: string) {
    const tag = this.options.tag;
    if (flag && content !== '') {
      this.renderer.setAttribute(tag, content);
      return;
    }
    this.renderer.removeAttribute(tag);
    if (tag != DEFAULT_TAG) {
      this.renderer.removeAttribute(DEFAULT_TAG);
    }
  }
}


class BoundRenderer {
  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  setAttribute(attr: string, value: string) {
    this.renderer.setAttribute(this.element.nativeElement, attr, value);
  }

  removeAttribute(attr: string) {
    this.renderer.removeAttribute(this.element.nativeElement, attr);
  }
}
