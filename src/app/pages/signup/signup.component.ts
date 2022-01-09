import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BrowserHelper } from 'src/app/services/helpers/browser.helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  message: any = null;

  processing: boolean = false;

  error: any = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private browserHelper: BrowserHelper) {
    this.signUpForm = this.formBuilder.group({
      emailMobile: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }

  get f() { return this.signUpForm.controls; }

  getButtonIcon(): any {
    return (this.processing) ? faSpinner : faChevronRight;
  }

  onSubmit(): void {
    if (this.processing) {
      return;
    }

    if (this.signUpForm.invalid) {
      return;
    }

    const emailOrMobile = this.signUpForm.controls['emailMobile'].value;

    this.processing = true;
    this.error = null;

    console.log("sdfg:" + emailOrMobile);

    this.authService.verifyEmailOrMobile(emailOrMobile).subscribe((response: any) => {
      this.processing = false;

      if (response && response.message) {
        console.log("response:  ", response);
        this.error = null;
        //this.browserHelper.gotoDashboard();
        return;
      }

      this.error = response && response.message;

    }, (error: any) => {
      this.processing = false;
      this.error = error && error.message;
    });
  }

}
