import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showFavorites : boolean;

  constructor(private router: Router){}
  toggleOverlay(){
    this.showFavorites = !this.showFavorites;
  }

  isAddRecipePage(): boolean {
    return this.router.url === '/addRecipe' || this.router.url.includes('/editRecipe');
  }


 
}
