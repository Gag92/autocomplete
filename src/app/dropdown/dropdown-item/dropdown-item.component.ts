import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { IOptionType } from '../../common';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})

export class DropdownItemComponent implements Highlightable {
  @Input() option: IOptionType;
  @Output() select: EventEmitter<any> = new EventEmitter;

  isActive = false;

  constructor() {}

  /**
   * this and other function below comes with Highlightable
   *  which is used for highlighting item which is active by key pressing
   */
  setActiveStyles(): void {
    this.isActive = !this.option.disabled;
  };

  setInactiveStyles(): void {
    this.isActive = false;
  }

  /**
   * emits selected value to parent
   */
  selectItem(): void {
    this.select.emit(this.option);
  }

}
