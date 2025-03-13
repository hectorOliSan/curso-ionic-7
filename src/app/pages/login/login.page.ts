import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

interface User {
  mail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail: string = '';
  password: string = '';

  user: User = {
    mail: 'social-map@mail.com',
    password: 'social123',
  };

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color
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
            this.showToast('Revisa tu email para recuperar tu contraseña', 'dark');
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
    if (this.mail === this.user.mail && this.password === this.user.password) {
      this.mail = '';
      this.password = '';
      this.router.navigate(['tabs']);
    } else {
      this.showToast('Email o contraseña no válidos', 'danger');
    }
  }

  register() {
    this.router.navigate(['register'], { replaceUrl: true });
  }
}
