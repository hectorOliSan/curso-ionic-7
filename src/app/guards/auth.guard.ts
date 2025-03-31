import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}
  async canActivate(): Promise<
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
  > {
    // const user = this.authService.userSession$.getValue();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user?.email === undefined) {
      this.router.navigate(['/login']);

      const toast = await this.toastCtrl.create({
        message: 'Debes estar registrado para acceder a ese contenido',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();

      return false;
    }

    return true;
  }
}
