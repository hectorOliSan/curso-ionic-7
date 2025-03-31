import { IonicModule } from '@ionic/angular';
import { Component, NgModule, OnInit } from '@angular/core';
import { PostsFacade } from '../../facades/posts.facade';
import { PostModel } from '../../models/post.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent implements OnInit {
  public modalData: any;
  public post!: PostModel;

  constructor(
    private postsFacade: PostsFacade,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.postsFacade.get(this.modalData.postId).subscribe((postData) => {
      this.post = postData;
    });
  }

  goBack() {
    this.modalCtrl.dismiss(null);
  }
}

@NgModule({
  declarations: [PostModalComponent],
  imports: [IonicModule],
})
export class PostModalModule {}
