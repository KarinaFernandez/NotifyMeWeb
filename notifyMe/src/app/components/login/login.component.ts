import { Component, OnInit } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  loginForm;
  errMsg;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() { }

  onSubmit(loginData) {
    this.errMsg = undefined;
    this.loginForm.reset();
    console.warn("Login information", loginData);

    const { email, contraseña } = loginData;

    if (email == "" || contraseña == "") {
      this.errMsg = "Por favor valide los datos ingresados"

    } else {

      // Call to service and if is okey redirect
      this.userService.login(email, contraseña).subscribe(user => {
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/home']);
      },
        err => {
          if (err.status === 409) {
            this.errMsg = 'No existe usuario con las credenciales ingresadas';
          }
        });
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
