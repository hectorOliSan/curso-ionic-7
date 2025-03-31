import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { UsersFacade } from 'src/app/facades/users.facade';
import { EmailValidator } from 'src/app/validators/email.validator';

import { UserModel } from '../../models/user.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public emailErrorMessages = {
    required: 'Campo requerido',
    email: 'Email inválido',
    emailExists: 'El email ya está en uso',
  };

  public register_form: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [EmailValidator.emailExists(this.usersFacade)]
    ),
    province: new FormControl('', []),
    city: new FormControl('', []),
    birthdate: new FormControl(new Date().toISOString(), []),
  });

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade,
    private fireAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  get emailError(): string {
    const emailControl = this.register_form.get('email');
    if (!emailControl?.errors) return '';

    if (emailControl.errors['required']) {
      return this.emailErrorMessages.required;
    }
    if (emailControl.errors['email']) {
      return this.emailErrorMessages.email;
    }
    if (emailControl.errors['emailExists']) {
      return this.emailErrorMessages.emailExists;
    }
    return '';
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
    });
    await toast.present();
  }

  async resetForm() {
    this.register_form.reset();
    this.register_form.get('birthdate')?.setValue(new Date().toISOString());
  }

  async createAccount(e: Event) {
    e.preventDefault();

    if (this.register_form.invalid) {
      const mail = this.register_form.get('email')?.value;

      if (this.register_form.get('email')?.errors?.['emailExists']) {
        this.showToast(`El email (${mail}), ya está en uso`, 'danger');
        return;
      }

      this.showToast(
        'Por favor, completa todos los campos requeridos',
        'danger'
      );
      return;
    }

    const register_btn = document.getElementById('register_btn');
    register_btn?.setAttribute('disabled', 'true');

    try {
      const d = new Date(this.register_form.value.birthdate);
      this.register_form
        .get('birthdate')
        ?.setValue(new Date(d.setHours(0, 0, 0, 0)).toISOString());

      await this.authService.signup(this.register_form.getRawValue());
      this.showToast(
        `Cuenta creada correctamente.
          Revisa tu email (${
            this.register_form.get('email')?.value
          }) para acceder`,
        'success'
      );
      this.resetForm();
      this.router.navigate(['login'], { replaceUrl: true });

    } catch (error) {
      // console.log(error);
      this.showToast(`Error al intentar crear la cuenta`, 'danger');

    } finally {
      register_btn?.removeAttribute('disabled');
    }
  }
}
