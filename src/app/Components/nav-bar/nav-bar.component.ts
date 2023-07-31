import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class NavBarComponent {
  constructor(private router: Router) { }
  showOrder(){
    this.router.navigateByUrl('/order-history');
  }
  showCart(){
    this.router.navigateByUrl('/cart');
  }
  home(){
    this.router.navigateByUrl('/');
  }
}
