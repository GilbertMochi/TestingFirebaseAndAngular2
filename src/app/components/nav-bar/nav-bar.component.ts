import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData as User;
  }

}
