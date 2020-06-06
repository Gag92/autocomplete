import { Component } from '@angular/core';

import { IOptionType } from './common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  options: Array<IOptionType> = [];
  selectedOption: string = '';

  constructor() {
    this.options = Array(13).fill(1, null).map((_, i) => ({
      label: 'Option' + i,
      value: 'value' + i,
      disabled: i % 5 === 0,
    }));
  }

  handleChange(value: string): void {
    this.selectedOption = value;
    console.log('Selected option:::', value);
  }
}
