import { Component, Input } from '@angular/core'

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
    this.dropdownList = Object.keys(this.items).filter((item: string) => {
      return item.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    })
  }

  select(item: string) {
    this.updateCoin({ coin: item, id: this.items[item] })
    this.selectedItem = item
    this.toggle()
  }

  selectCurrentTopResult() {
    this.select(this.dropdownList[0])
  }
}
