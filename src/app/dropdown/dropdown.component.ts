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
  
  @Input() items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
  @Input() selectedItem: string = 'Item 1'
  @Input() updateCoin: (args: any) => void = (item: string) => {}

  constructor() {}

  ngOnInit() {
    this.dropdownList = this.items
  }

  filterOptions(value: string) {
    this.dropdownList = this.items.filter((item: string) => {
      return item.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    })
  }

  select(item: string) {
    this.updateCoin(item)
    this.selectedItem = item
    this.toggle()
  }

  selectCurrentTopResult() {
    this.select(this.dropdownList[0])
  }
}
