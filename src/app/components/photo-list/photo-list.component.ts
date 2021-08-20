import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  constructor(private _photoSrv: PhotoService, private router: Router) {}

  ngOnInit(): void {
    this._photoSrv.getPhotos().subscribe(
      (res) => (this.photos = res),
      (err) => console.log(err)
    );
  }

  selectedCard(id: string) {
    this.router.navigate([`/photos/${id}`]);
  }
}
