import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class DropdownItemComponent implements Highlightable {
  @Input() option: string = '';
  @Output() select: EventEmitter<any> = new EventEmitter;

  isActive = false;

  constructor() {}

  setActiveStyles(): void {
    this.isActive = true;
  };

  setInactiveStyles(): void {
    this.isActive = false;
  }

  selectItem(): void {
    this.select.emit(this.option);
  }

  getLabel(): string {
    return this.option;
  }

}
