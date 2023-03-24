import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../../Models/UserLoginModel';
import { ApiRoutes } from '../../Routes/ApiRoutes';
import { ApiResponseWithBody } from 'src/app/Models/ApiResponse';
import { firstValueFrom } from 'rxjs';
import { AppConsts } from 'src/app/Routes/AppConsts';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  // Whether we are currently logging in
  mLoggingIn: boolean = false;

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  private ShowErrors(errors: string[]) {
    console.log(errors);
  }


  public async Login(event: Event) {
    // If we are already performining log in
    if (this.mLoggingIn)
      // Don't do anything
      return;

    // Set button content indicating we are performing log in
    (event.target as HTMLElement).textContent = "Logging in ...";

    // Get the email entered by the user
    var email = (document.querySelector("#loginemail") as HTMLInputElement).value;

    // Get the password entered by the user
    var password = (document.querySelector("#loginpassword") as HTMLInputElement).value;

    // Create the result of the login request
    var result: ApiResponseWithBody<string> | null = null;

    try {
      // Send login request to the server
      result = await firstValueFrom(this.httpClient.post<ApiResponseWithBody<string>>(
        AppConsts.ServerAddress + ApiRoutes.Login, new UserLoginModel(email, password)));
    }
    // If there was an error
    catch (error) {
      // Ignore it
    }

    // If we have no result
    if (result == null) {
      // Tell the user that we couldn't connect to the server
      var errors = new Array<string>();
      errors.push("Could not connect to the server")
      this.ShowErrors(errors);
    }
    // Otherwise, if login has successded
    else if (result.Successful) {
      // Store the jwt token
      localStorage.setItem(AppConsts.JwtTokenKey, result.Body as string);

      // TODO: Redirect the user to the return url
      this.router.navigate(['/signup']);
    }
    else {
      // Display errors
      this.ShowErrors(result.Errors!);
    }

    // Set button content back to log in
    (event.target as HTMLElement).textContent = "Log in";
  }
}
