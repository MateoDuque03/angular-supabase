import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$ = this.authService.user$;
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
