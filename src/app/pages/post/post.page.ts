import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { take } from 'rxjs';

import { PostsFacade } from 'src/app/facades/posts.facade';

import { Geolocation } from '@capacitor/geolocation';

import { CamaraService } from 'src/app/services/camara.service';

import { ContactModel } from 'src/app/models/contact.model';
import { UserModel } from 'src/app/models/user.model';

import { ContactsFacade } from 'src/app/facades/contacts.facade';
import { UsersFacade } from 'src/app/facades/users.facade';
import { LabelsFacade } from 'src/app/facades/labels.facade';
import { MediaFacade } from 'src/app/facades/media.facade';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public isNew: boolean = true;

  public contactos: ContactModel[] = [];
  public usuarios: UserModel[] = [];

  public post_form: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    contacts: new FormControl('0', []),
    media: new FormControl([], []),
    lat: new FormControl(0, []),
    lng: new FormControl(0, []),
  });

  // @ts-ignore
  @ViewChild('video') videoInput: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private postsFacade: PostsFacade,
    private camaraSvc: CamaraService,
    private contactsFacade: ContactsFacade,
    private usersFacade: UsersFacade,
    private labelsFacade: LabelsFacade,
    private mediaFacade: MediaFacade,
    private authService: AuthService,
    private router: Router
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

  public async takePhoto() {
    const photo = await this.camaraSvc.takePhoto();
    const savedPhoto = await this.camaraSvc.savePhoto(photo);

    const media = this.post_form.get('media')?.value;
    media.push(savedPhoto);
    this.post_form.get('media')?.setValue(media);

    this.updatePhoto(savedPhoto);
  }

  public async updatePhoto(savedPhoto: { fileName?: string; webPath: any }) {
    const photoPicker = document.getElementById('photoPicker') as HTMLElement;
    const photoNotShow = document.getElementById('photoNotShow') as HTMLElement;
    const photoShow = document.getElementById('photoShow') as HTMLImageElement;

    if (savedPhoto.webPath) {
      photoPicker.style.padding = '0';
      photoNotShow.style.display = 'none';
      photoShow.style.display = 'block';
      photoShow.src = savedPhoto.webPath;
    }
  }

  public async takeVideo() {
    this.videoInput.nativeElement.click();
  }

  public async saveVideo(evento: any) {
    const files = evento.currentTarget.files;
    if (files.length) {
      const video = files[0];
      const savedVideo = await this.camaraSvc.saveVideo(video);

      const media = this.post_form.get('media')?.value;
      media.push(savedVideo);
      this.post_form.get('media')?.setValue(media);

      this.updateVideo(savedVideo);
    }
  }

  public async updateVideo(savedVideo: { fileName?: string; videoUri: any }) {
    const videoPicker = document.getElementById('videoPicker') as HTMLElement;
    const videoNotShow = document.getElementById('videoNotShow') as HTMLElement;
    const videoShow = document.getElementById('videoShow') as HTMLVideoElement;

    if (savedVideo.videoUri) {
      videoPicker.style.padding = '0';
      videoNotShow.style.display = 'none';
      videoShow.style.display = 'block';
      videoShow.src = await this.camaraSvc.getVideoUrl(savedVideo.videoUri);
      videoShow.muted = true;
    }
  }

  async process_post() {
    if (this.post_form.invalid) {
      this.showToast('Hay campos incorrectos o no completados', 'danger');
      return;
    }

    const posicion = await Geolocation.getCurrentPosition();
    this.post_form.get('lat')?.setValue(posicion.coords.latitude);
    this.post_form.get('lng')?.setValue(posicion.coords.longitude);

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

  goToMap() {
    this.router.navigate(['/tabs/map']);
  }
}
