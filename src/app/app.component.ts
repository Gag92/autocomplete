import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  options: Array<string> = [];
  selectedOption: string = '';

  constructor() {
    this.options = Array(12).fill(null).map((_, i) => 'Option' + (i + 1));
  }

  handleChange(value: string): void {
    this.selectedOption = value;
    console.log('Selected option:::', value);
  }
}
