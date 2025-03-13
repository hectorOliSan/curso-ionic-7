import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public isNew: boolean = true;

  public post_form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contacts: new FormControl('', []),
    media: new FormControl('', []),
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
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

  async process_post() {
    if (this.post_form.invalid) {
      this.showToast('Hay campos incorrectos o no completados', 'danger');
      return;
    }

    if (this.isNew) this.showToast('Post creado correctamente', 'success');
    else this.showToast('Post actualizado correctamente', 'success');
  }
}
