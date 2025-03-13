import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { flatMap, take } from 'rxjs';

import { PostsFacade } from 'src/app/facades/posts.facade';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public isNew: boolean = true;

  public post_form: FormGroup = this.formBuilder.group({
    id: new FormControl(undefined, []),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contacts: new FormControl('', []),
    media: new FormControl('', []),
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private postsFacade: PostsFacade
  ) {}

  ngOnInit() {
    this.isNew = false;
  }

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

    if (this.isNew) this.create_post();
    else this.update_post();
  }

  async create_post() {
    const post = this.post_form.value;
    this.postsFacade
      .create(post)
      .pipe(take(1))
      .subscribe(
        async (success) => {
          this.showToast('Post creado correctamente', 'success');
        },
        async (error) => {
          this.showToast('Error al intentar crear el post', 'danger');
        }
      );
  }

  async update_post() {
    const post = this.post_form.value;
    this.postsFacade
      .update(post)
      .pipe(take(1))
      .subscribe(
        async (success) => {
          this.showToast('Post actualizado correctamente', 'success');
        },
        async (error) => {
          this.showToast('Error al intentar actualizar el post', 'danger');
        }
      );
  }
}
