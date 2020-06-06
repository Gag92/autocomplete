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
import { IOptionType } from '../common';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements AfterViewInit {
  @Input() options: Array<IOptionType> = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter;

  @ViewChildren(DropdownItemComponent) queryOptions: QueryList<DropdownItemComponent>;

  /**
   * setting up key manager, which will be used in order to change active items by key pressing
   */
  private keyManager: ActiveDescendantKeyManager<any>;

  isOpen: boolean = false;
  state: string = '';
  selected: IOptionType;
  optionsStored: Array<IOptionType> = [];

  constructor() {}

  /**
   * handles filter by making lowercase and if value exists in item shows in view
   */
  filterHandler(): void {
    this.isOpen = true;
    this.options = this.optionsStored.filter((item: IOptionType) => item.label.toLowerCase().includes(this.state.toLowerCase()));
  }

  /**
   * overlay closing function
   */
  backdropHandler(): void {
    this.isOpen = false;
  }

  /**
   * overlay opener
   */
  openHandler(): void {
    this.isOpen = true;
  }

  /**
   * function takes value and use it as an state, in order to show in input selected value
   * also filters options to appropriate selected value
   * closes overlay and emits value to parent
   * @param value
   */
  selectHandler(value: IOptionType): void {
    this.selected = value;
    this.state = this.selected.label;
    this.options = this.optionsStored.filter((item: IOptionType) => item.label.toLowerCase() === this.state.toLowerCase());
    this.backdropHandler();
    this.onChange.emit(this.selected);
  }

  /**
   * This class manages keyboard events for selectable lists. If you pass it a query list
   * of items, it will set the active item correctly when arrow events occur.
   * withWrap:: when you reach to final element and clicking again it brings you to the top of list
   * skipPredicate:: skips when is disabled, so its makes active next option
   */
  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.queryOptions).withWrap().skipPredicate(item => item.option.disabled);
    this.optionsStored = [...this.options];
  }

  /**
   * function is used for managing ArrowUp, ArrowDown, also works for long press
   * sets the active item depending on the key event passed in.
   * @param event Keyboard event to be used for determining which element should be active
   */
  onKeyDown(event): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      !this.isOpen && (this.isOpen = true);
      this.keyManager.onKeydown(event);
    }
  }

  /**
   * function is used for other keyup cases
   * if enter sets
   * @param event
   */
  onKeyUp(event): void {
    if (event.key === 'Enter') {
      !this.keyManager.activeItem.option.disabled && this.selectHandler(this.keyManager.activeItem.option);
    } else {
      this.filterHandler();
    }
  }

}
