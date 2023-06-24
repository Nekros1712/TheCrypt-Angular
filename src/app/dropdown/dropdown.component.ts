import { Component, Input } from '@angular/core';
import { ChartService } from '../chart.service'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  show: boolean = false
  toggle = () => this.show = !this.show

  @Input() items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
  @Input() selectedItem: string = 'Item 1'

  constructor(private chartService: ChartService) {}

  select(item: string) {
    this.chartService.setCoin(item)
    this.selectedItem = item
    this.toggle()
  }
}
