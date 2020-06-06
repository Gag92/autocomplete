import {
  Component,
  Input,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation, Output, EventEmitter,
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements AfterViewInit {
  @Input() options: Array<string> = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter;

  @ViewChildren(DropdownItemComponent) queryOptions: QueryList<DropdownItemComponent>;

  private keyManager: ActiveDescendantKeyManager<any>;

  isOpen: boolean = false;
  state: string = '';
  selected: string = '';
  optionsStored = [];

  constructor() {}

  filterHandler(): void {
    this.isOpen = true;
    this.options = this.optionsStored.filter(item => item.toLowerCase().includes(this.state.toLowerCase()));
  }

  backdropHandler(): void {
    this.isOpen = false;
  }

  openHandler(): void {
    this.isOpen = true;
  }

  selectHandler(value: string): void {
    this.selected = value;
    this.state = this.selected;
    this.options = this.optionsStored.filter(item => item.toLowerCase() === this.state.toLowerCase());
    this.backdropHandler();
    this.onChange.emit(this.selected);
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.queryOptions).withWrap()
    .withTypeAhead();
    this.optionsStored = [...this.options];
  }

  onKeyDown(event): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      !this.isOpen && (this.isOpen = true);
      this.keyManager.onKeydown(event);
    }
  }

  onKeyUp(event): void {
    if (event.key === 'Enter') {
      this.selectHandler(this.keyManager.activeItem.option);
    } else {
      this.filterHandler();
    }
  }

}
