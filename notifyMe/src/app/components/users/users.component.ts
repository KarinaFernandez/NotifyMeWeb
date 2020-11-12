import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  titulos = [];
  errMsg;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((a: any) => {
      console.log(a);
      this.userService.setUsers(a);
      this.users = a;

      if (this.users.length > 0) {
        this.titulos = ["Nombre", "Email", "Cant incidentes reportados", "Activo"];
      }
    })
  }

  disableUser(index) {
    console.log(index);
    let user = this.users[index];
    console.log(user);

    this.userService.disableUser(user._id, !user.activo).subscribe((a: any) => {
      if (a.codigo == 409 || a.codigo == 404 || a.codigo == 400 ) {
        this.errMsg = a.mensaje;
      } else {
        this.getUsers();
      }
    })
  }
}
