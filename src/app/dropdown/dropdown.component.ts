import { Component, Input, SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  show: boolean = false
  dropdownList: any[] = []
  toggle = () => this.show = !this.show
  
  @Input() items: any = { 'Item 1': 'item-1' }
  @Input() selectedItem: string = 'Item 1'
  @Input() updateCoin: (args: any) => void = (item: string) => {}

  constructor() {}

  ngOnInit() {
    this.dropdownList = Object.keys(this.items)
  }

  filterOptions(value: string) {
    this.show = true
    this.dropdownList = Object.keys(this.items).filter((item: string) => {
      return item.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    })
  }

  select(item: string) {
    this.updateCoin({ coin: item, id: this.items[item] })
    this.selectedItem = item
    this.show = false
  }

  selectCurrentTopResult() {
    this.show = false
    this.select(this.dropdownList[0])
  }

  ngOnChanges(change: SimpleChanges) {
    this.items = change['items'].currentValue
    this.dropdownList = Object.keys(this.items)
  }
}
