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
  loading = false;

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

    const { email, password } = loginData;

    if (email == "" || password == "") {
      this.errMsg = "Por favor valide los datos ingresados"

    } else {
      this.loading = true;

      // Call to service and if is okey redirect
      this.userService.login(email, password).subscribe(user => {
        this.loading = false;
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/home']);
      },
        err => {
          if (err.status === 409) {
            this.errMsg = 'No existe usuario con las credenciales ingresadas';
          } else {
            console.log(err);
            this.errMsg = 'Valide los datos ingresados';
          }
        });
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
