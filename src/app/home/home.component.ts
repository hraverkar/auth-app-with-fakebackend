import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().pipe(first()).subscribe(user => {
      this.users = user;
    })
  }

}
