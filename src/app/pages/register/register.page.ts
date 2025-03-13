import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface NewUser {
  name: string;
  surname: string;
  email: string;
  province: string;
  city: string;
  age: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  newUser: NewUser = {
    name: '',
    surname: '',
    email: '',
    province: '',
    city: '',
    age: 0,
  };

  constructor(private toastCtrl: ToastController, private router: Router) {}

  ngOnInit() {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color
    });
    await toast.present();
  }

  async createAccount(e: Event) {
    e.preventDefault();
    
    if (
      Object.values(this.newUser).some((value) => value === '' || value === 0)
    ) {
      this.showToast('Por favor, completa todos los campos', 'danger');
      return;
    }

    this.showToast(
      `Cuenta creada correctamente.
      Revisa tu email (${this.newUser.email}) para acceder`,
      'success'
    );

    this.router.navigate(['login'], { replaceUrl: true });
  }
}
