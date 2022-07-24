import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testingPlayground';

  toggleViaSessionStorage() {
    localStorage.setItem("testid", localStorage.getItem("testid") === "true" ? "false" : "true")
  };
}
