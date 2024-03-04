import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string;
  @Output() searchValue = new EventEmitter<string>();

  filterRecipes(){
    this.searchValue.emit(this.searchTerm);
  }

}
