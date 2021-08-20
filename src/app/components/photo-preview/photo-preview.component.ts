import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css'],
})
export class PhotoPreviewComponent implements OnInit {
  id: string = '';
  photo: Photo;
  constructor(
    private _photoSrv: PhotoService,
    private actRout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actRout.params.subscribe((params) => {
      this.id = params['id'];
    });
    setTimeout(() => {
      this._photoSrv.getPhoto(this.id).subscribe(
        (res) => (this.photo = res),
        (err) => console.log(err)
      );
    }, 1000);
  }

  deletePhoto(id: string) {
    this._photoSrv.deletePhoto(id).subscribe(
      (res) => {
        this.router.navigate(['/photos']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updatePhoto(
    id: string,
    titulo: HTMLInputElement,
    descripcion: HTMLTextAreaElement
  ): boolean {
    this._photoSrv.updatePhoto(id, titulo.value, descripcion.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    return false;
  }
}
