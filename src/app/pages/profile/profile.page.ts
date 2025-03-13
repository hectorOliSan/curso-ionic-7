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
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile_form: FormGroup = this.formBuilder.group({
    id: new FormControl('', []),
    avatar: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl(new Date().toISOString(), []),
    sexo: new FormControl('', []),
    phone: new FormControl('', [Validators.pattern(/^(6|7|8|9)\d{8}$/)]),
  });

  public password_form: FormGroup = this.formBuilder.group({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required]),
  });

  random = Math.random();
  USER_AVATAR: string = `https://api.dicebear.com/9.x/identicon/svg?seed=${Math.random()}`;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
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

  async updateProfile(e: Event) {
    e.preventDefault();

    if (this.profile_form.invalid) {
      this.showToast(
        'Por favor, completa todos los campos requeridos',
        'danger'
      );
      return;
    }

    this.profile_form.reset();
    this.showToast('Perfil actualizado correctamente', 'success');
  }

  async updatePassword(e: Event) {
    e.preventDefault();

    if (this.password_form.invalid) {
      this.showToast(
        'Por favor, completa todos los campos requeridos',
        'danger'
      );
      return;
    }

    if (
      this.password_form.controls['newPassword'].value !==
      this.password_form.controls['newPasswordConfirm'].value
    ) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    if (
      this.password_form.controls['password'].value ==
      this.password_form.controls['newPassword'].value
    ) {
      this.showToast(
        'La nueva contraseña debe ser distinta a la actual',
        'danger'
      );
      return;
    }

    this.password_form.reset();
    this.showToast('Contraseña actualizada correctamente', 'success');
  }

  goToLogin() {
    this.profile_form.reset();
    this.password_form.reset();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
