import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public register_form: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    province: new FormControl('', []),
    city: new FormControl('', []),
    age: new FormControl('', []),
  });

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
    });
    await toast.present();
  }

  async createAccount(e: Event) {
    e.preventDefault();

    if (this.register_form.invalid) {
      this.showToast(
        'Por favor, completa todos los campos requeridos',
        'danger'
      );
      return;
    }

    this.showToast(
      `Cuenta creada correctamente.
      Revisa tu email (${this.register_form.controls['email'].value}) para acceder`,
      'success'
    );

    this.resetForm();
    this.router.navigate(['login'], { replaceUrl: true });
  }

  async resetForm() {
    this.register_form.reset();
  }
}
