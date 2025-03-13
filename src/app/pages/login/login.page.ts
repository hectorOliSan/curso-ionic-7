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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login_form: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit() {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
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
          placeholder: 'tu@email.com',
          type: 'email',
        },
      ],
      buttons: [
        {
          text: 'Recuperar',
          role: 'confirm',
          handler: async () => {
            this.showToast(
              'Revisa tu email para recuperar tu contraseña',
              'dark'
            );
            this.router.navigate(['login']);
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
      this.showToast('Email o contraseña no válidos', 'danger');
      return;
    }

    this.usersFacade
      .login(this.login_form.get('email')?.value, this.login_form.get('password')?.value)
      .pipe(take(1))
      .subscribe(
        async (success) => {
          this.showToast('Sesión iniciada correctamente', 'success');
          this.resetForm();
          this.router.navigate(['tabs']);
        },
        async (error) => {
          this.showToast('Credenciales incorrectas', 'danger');
        }
      );
  }

  async register() {
    this.resetForm();
    this.router.navigate(['register'], { replaceUrl: true });
  }

  async resetForm() {
    this.login_form.reset();
  }
}
