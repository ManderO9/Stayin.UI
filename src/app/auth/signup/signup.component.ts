import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiResponseWithBody } from 'src/app/Models/ApiResponse';
import { UserCreateModel } from 'src/app/Models/UserCreateModel';
import { UserLoginModel } from 'src/app/Models/UserLoginModel';
import { ApiRoutes } from 'src/app/Routes/ApiRoutes';
import { AppConsts } from 'src/app/Routes/AppConsts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {


  // Whether we are currently signing in
  mSigningIn: boolean = false;

  // List of errors to display on the page if any
  errors: string[] = [];

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  // Displays errors to the user
  private ShowErrors(newErrors: string[]) {
    this.errors = newErrors;
  }

  // Signs the user in the app
  public async Signup(event: Event) {
    // If we are already performining sign up
    if (this.mSigningIn)
      // Don't do anything
      return;

    // Set button content indicating we are performing sign up
    (event.target as HTMLElement).textContent = "Signing in ...";

    // Get the email entered by the user
    var email = (document.querySelector("#email") as HTMLInputElement).value;

    // Get the password entered by the user
    var password = (document.querySelector("#password") as HTMLInputElement).value;

    // Get the username entered by the user
    var username = (document.querySelector("#username") as HTMLInputElement).value;

    // Create the result of the signup request
    var result: ApiResponseWithBody<string> | null = null;

    try {
      // Send signup request to the server
      result = await firstValueFrom(this.httpClient.post<ApiResponseWithBody<string>>(
        AppConsts.ServerAddress + ApiRoutes.SignUp, new UserCreateModel(email, password, username)));
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
    // Otherwise, if sign up has successded
    else if (result.Successful) {
      // Store the jwt token
      localStorage.setItem(AppConsts.JwtTokenKey, result.Body as string);

      // TODO: Redirect the user to the home page
      this.router.navigate(['/login']);
    }
    else {
      // Display errors
      this.ShowErrors(result.Errors!);
    }

    // Set button content back to sign up
    (event.target as HTMLElement).textContent = "Sign up";
  }


}
