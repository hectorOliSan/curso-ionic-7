import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  public albumName: string = 'ALBUM-SOCIAL-MEDIA';

  constructor(private toastCtrl: ToastController) {}

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
    });
    await toast.present();
  }

  public async requestPermissions() {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera != 'granted' || permissions.photos != 'granted') {
      const response = await Camera.requestPermissions();
      if (response.camera != 'granted' || response.photos != 'granted') {
        this.showToast('Acceso a la cámara denegado', 'danger');
        return false;
      }
      return true;
    }
    return true;
  }

  public async takePhoto() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Base64,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    return photo;
  }

  public async savePhoto(photo: Photo) {
    const file64 = await this.base64photo(photo);
    const fileName = Date.now() + '.jpeg';
    const file = await Filesystem.writeFile({
      path: fileName,
      data: file64,
      directory: Directory.Data,
    });
    return {
      fileName,
      webPath: photo.webPath,
    };
  }

  public async listPhotos() {
    const listFiles = await Filesystem.readdir({
      path: '',
      directory: Directory.Data,
    });
    const listImages = listFiles.files.filter((file) => {
      return file.name.includes('.jpeg');
    });
    let resultado: any[] = [];
    listImages.map(async (photo) => {
      const file = await Filesystem.readFile({
        path: photo.name,
        directory: Directory.Data,
      });
      resultado.push({
        ...photo,
        webPath: `data:image/jpeg;base64,${file.data}`,
      });
    });
    console.log(resultado);
    return resultado;
  }

  private async base64photo(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return (await this.blobToBase64(blob)) as string;
  }

  private async blobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  public async saveVideo(videoFile: File) {
    const videoUrl = URL.createObjectURL(videoFile);
    const fileName = new Date().getTime() + '.mp4';
    const base64Data = (await this.blobToBase64(videoFile)) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    return {
      fileName,
      videoPath: videoUrl,
      videoUri: savedFile.uri,
      type: 'video',
    };
  }

  public async getVideoUrl(fullPath: string) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Data,
    });
    return `data:video/mp4;base64,${file.data}`;
  }
}
