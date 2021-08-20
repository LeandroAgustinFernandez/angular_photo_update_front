import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;
  constructor(private _photoSrv: PhotoService, private router: Router) {}

  ngOnInit(): void {}
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //Image Preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
  uploadPhoto(
    titulo: HTMLInputElement,
    descripcion: HTMLTextAreaElement
  ): boolean {
    // console.log(titulo.value, descripcion.value);
    // console.log(this.file);
    this._photoSrv
      .createPhoto(titulo.value, descripcion.value, this.file)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/photos']);
        },
        (err) => console.log(err)
      );
    return false;
  }
}
