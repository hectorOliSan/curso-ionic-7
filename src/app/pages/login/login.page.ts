import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';
import { take } from 'rxjs';

import { UsersFacade } from 'src/app/facades/users.facade';
import { EmailValidator } from 'src/app/validators/email.validator';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public emailErrorMessages = {
    required: 'Campo requerido',
    email: 'Email inválido',
    emailNotExists: 'El email no se encuentra en la base de datos',
  };

  public login_form: FormGroup = this.formBuilder.group({
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [EmailValidator.emailNotExists(this.usersFacade)]
    ),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  get emailError(): string {
    const emailControl = this.login_form.get('email');
    if (!emailControl?.errors) return '';

    if (emailControl.errors['required']) {
      return this.emailErrorMessages.required;
    }
    if (emailControl.errors['email']) {
      return this.emailErrorMessages.email;
    }
    if (emailControl.errors['emailNotExists']) {
      return this.emailErrorMessages.emailNotExists;
    }
    return '';
  }

  async showToast(message: string, color: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
    });
    await toast.present();
  }

  async recover() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperar contraseña',
      subHeader:
        'Por favor, ingresa tu email para recibir una nueva contraseña temporal.',
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'tu@email.com',
          type: 'email',
        },
      ],
      buttons: [
        {
          text: 'Recuperar',
          role: 'confirm',
          handler: async (data) => {
            if (!data.recoverEmail) {
              this.showToast('Por favor ingresa un email válido', 'danger');
              return false;
            }

            try {
              this.authService.resetPassword(data.recoverEmail);
              this.showToast(
                'Revisa tu email para recuperar tu contraseña',
                'dark',
                5000
              );
              this.router.navigate(['login']);
              return true;
            } catch (error) {
              // console.log(error);
              this.showToast(
                'Error al enviar el email de recuperación',
                'danger'
              );
              return false;
            }
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async login(e: Event) {
    e.preventDefault();

    if (this.login_form.invalid) {
      const mail = this.login_form.get('email')?.value;

      if (this.login_form.get('email')?.errors?.['emailNotExists']) {
        this.showToast(
          `El email (${mail}), no se encuentra en la base de datos`,
          'danger'
        );
        return;
      }

      this.showToast('Email o contraseña no válidos', 'danger');
      return;
    }

    try {
      const loggedUser = await this.authService.login(
        this.login_form.get('email')?.value,
        this.login_form.get('password')?.value
      );

      loggedUser.subscribe((user) => {
        this.showToast('Sesión iniciada correctamente', 'success');
        this.resetForm();
        this.router.navigate(['tabs']);
      });
    } catch (error) {
      // console.log(error);
      this.showToast(
        'Credenciales incorrectas. Por favor revise sus credenciales y vuelva a intentarlo.',
        'danger'
      );
    }
  }

  async register() {
    this.resetForm();
    this.router.navigate(['register'], { replaceUrl: true });
  }

  async resetForm() {
    this.login_form.reset();
  }
}
