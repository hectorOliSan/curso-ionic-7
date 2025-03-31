import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { from, take } from 'rxjs';

import { UsersFacade } from 'src/app/facades/users.facade';
import { UserModel } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile_form: FormGroup = this.formBuilder.group({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl(new Date().toISOString(), []),
    province: new FormControl('', []),
    city: new FormControl('', []),
    gender: new FormControl('', []),
    phone: new FormControl('', [Validators.pattern(/^(6|7|8|9)\d{8}$/)]),
  });

  public password_form: FormGroup = this.formBuilder.group({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required]),
  });

  // user = this.authService.userSession$.getValue();
  user = JSON.parse(localStorage.getItem('user') || '{}');

  USER_AVATAR = `https://api.dicebear.com/9.x/identicon/svg?seed=${this.user.id}`;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private usersFacade: UsersFacade,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profile_form.get('email')?.disable();

    this.profile_form.get('id')?.setValue(this.user?.id);
    this.profile_form.get('email')?.setValue(this.user?.email);
    this.profile_form.get('name')?.setValue(this.user?.name);
    this.profile_form.get('surname')?.setValue(this.user?.surname);
    this.profile_form.get('province')?.setValue(this.user?.province);
    this.profile_form.get('city')?.setValue(this.user?.city);
    this.profile_form.get('gender')?.setValue(this.user?.gender);
    this.profile_form.get('phone')?.setValue(this.user?.phone);
    this.profile_form.get('birthdate')?.setValue(this.user?.birthdate);
  }

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

    const d = new Date(this.profile_form.value.birthdate);
    this.profile_form
      .get('birthdate')
      ?.setValue(new Date(d.setHours(1, 0, 0, 0)).toISOString());

    const user = this.profile_form.getRawValue();
    from(this.usersFacade.update(user))
      .pipe(take(1))
      .subscribe(
        async (success) => {
          this.showToast('Perfil actualizado correctamente', 'success');
        },
        async (error) => {
          this.showToast('Error al intentar actualizar perfil', 'danger');
        }
      );
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

    try {
      this.authService.updatePassword(
        this.profile_form.get('email')?.value,
        this.password_form.controls['password']?.value,
        this.password_form.controls['newPassword']?.value
      );
      this.showToast('Contraseña actualizada correctamente', 'success');
    } catch (error) {
      console.log(error);
      this.showToast('Error al intentar actualizar la contraseña', 'danger');
    }

    this.password_form.reset();
  }

  goToLogin() {
    this.authService.logout();
    this.profile_form.reset();
    this.password_form.reset();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
