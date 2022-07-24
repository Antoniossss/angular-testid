import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {of, Subject} from 'rxjs';
import {By} from '@angular/platform-browser';
import {AngularTestidModule} from './angular-testid.module';
import {AngularTestidService} from './angular-testid.service';

describe('AngularTestidComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const isEnabled = new Subject<boolean>();
  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        AngularTestidModule
      ],
      providers: [
        {provide: AngularTestidService, useValue: {isEnabled}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show id everywhere', () => {
    isEnabled.next(true);
    component.tagContent = 'someContent';
    fixture.detectChanges();
    // console.log(fixture.debugElement.nativeElement);
    expect(fixture.debugElement.query(By.css('#static')).attributes.testid).toEqual('staticContent');
    expect(fixture.debugElement.query(By.css('#mutating')).attributes.testid).toEqual('someContent');

    isEnabled.next(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#static')).attributes.testid).toBeNull();
    expect(fixture.debugElement.query(By.css('#mutating')).attributes.testid).toBeNull();
  });

  it('should hide if content is falsy', () => {
    isEnabled.next(true);
    component.tagContent = '';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#mutating')).attributes.testid).toBeNull();
  });

  it('using custom tag works (and removes default one) when using one time binding attribute', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        AngularTestidModule.with({enabledByDefault: true, tag: 'test-cy'})
      ],
      providers: [
        {provide: AngularTestidService, useValue: {isEnabled: of(true)}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.tagContent = 'myTags';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#static')).attributes['test-cy']).toEqual('staticContent');
    expect(fixture.debugElement.query(By.css('#static')).attributes.testid).toBeNull();
    expect(fixture.debugElement.query(By.css('#mutating')).attributes['test-cy']).toEqual('myTags');

    expect(document.getElementById('static').outerHTML.indexOf('testid')).toEqual(-1);
    console.log(fixture.debugElement.nativeElement);
  });
});


@Component({
  selector: 'testing',
  template: `
    <span>Litwo</span>
    <span id="mutating" [testId]="tagContent">Ojczyzno moja</span>
    <span id="static" testId="staticContent">Ty jesteś jak zdrowie</span>
  `
})
class TestComponent {
  tagContent = '';
}
