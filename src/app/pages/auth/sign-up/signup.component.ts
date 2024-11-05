import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SigUpComponent {
  public signUpError!: String;
  public validSignup!: boolean;
  public isSubmitting = false;
  @ViewChild('name') nameModel!: NgModel;
  @ViewChild('lastname') lastnameModel!: NgModel;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;
  @ViewChild('confirmPassword') confirmPasswordModel!: NgModel;

  public user: IUser = {password: '', confirmPassword: ''}

  constructor(private router: Router, 
    private authService: AuthService
  ) {}

  public handleSignup(event: Event) {
    event.preventDefault();
    [this.nameModel, this.lastnameModel, this.emailModel, this.passwordModel, this.confirmPasswordModel].forEach(model => {
      if (!model.valid) {
        model.control.markAsTouched();
      }
    });

    const passwordsMatch = this.user.password === this.user.confirmPassword;
    if (!passwordsMatch) {
      this.signUpError = "Passwords do not match";
      return;
    }else {
      this.signUpError = "";
    }

    if (this.nameModel.valid && this.lastnameModel.valid && this.emailModel.valid && this.passwordModel.valid && passwordsMatch) {
      this.isSubmitting = true;
      this.authService.signup(this.user).subscribe({
        next: () => {
          this.validSignup = true;
          this.isSubmitting = false;
        },
        error: (err: any) => {
          this.signUpError = err.description;
          this.isSubmitting = false;
        },
      });
    }
  }
}
