import { Component, Input } from '@angular/core'

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
  @Input() updateChart: (args: any) => void = (item: string) => {}

  constructor() {}

  select(item: string) {
    this.updateChart(item)
    this.selectedItem = item
    this.toggle()
  }
}
