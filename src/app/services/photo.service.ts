import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  URI = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient) {}

  createPhoto(titulo: string, descripcion: string, foto: File) {
    const fd = new FormData();
    fd.append('titulo', titulo);
    fd.append('descripcion', descripcion);
    fd.append('image', foto);
    console.log();
    return this.http.post(this.URI, fd);
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.URI);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.URI}/${id}`);
  }
  deletePhoto(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }
  updatePhoto(id: string, titulo: string, descripcion: string) {
    const photo = {
      titulo: titulo,
      descripcion: descripcion,
    };
    return this.http.put(`${this.URI}/${id}`, photo);
  }
}
