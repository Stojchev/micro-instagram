import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService implements OnInit{
  photosURL = 'https://jsonplaceholder.typicode.com/photos';
  private _photos: BehaviorSubject<Photo[]>;

  private dataStore: {
    photos: Photo[];
  };
  photoTmp!: Photo;

  constructor(private http: HttpClient) {
    this.dataStore = { photos: [] };
    this._photos = new BehaviorSubject<Photo[]>([]);
  }
  ngOnInit(): void {
    this.loadAll();
  }

  get photos(): Observable<Photo[]> {
    return this._photos.asObservable();
  }

  deleteElement(id: number): Observable<any> {
    const url = `${this.photosURL}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap(() => {
        const index = this.dataStore.photos.findIndex(photo => photo.id === id);
        if (index >= 0) {
          this.dataStore.photos.splice(index, 1);
          this._photos.next(Object.assign({}, this.dataStore).photos);
        }
      })
    );
  }

  loadAll() {
    if(this.dataStore.photos.length>0) {
      return;
    }
    return this.http.get<Photo[]>(this.photosURL).pipe(
      catchError((error) => {
        return throwError(error);
      })
    ).subscribe((data) => {
      this.dataStore.photos = data;
      this._photos.next(Object.assign({}, this.dataStore).photos);
    });
  }

  getById(id: number) {
    if(this.dataStore.photos.length==0)
      this.loadAll();
    return this.dataStore.photos.find((photo) => photo.id == id);
  }

  addPhoto(photo: Photo):Promise<Photo> {
    if(this.dataStore.photos.length==0){
      this.loadAll();
    }
    return new Promise((resolver,reject)=>{
      photo.id=this.dataStore.photos[this.dataStore.photos.length-1].id+1;
      this.dataStore.photos.push(photo);
      this._photos.next(Object.assign({},this.dataStore).photos);
      resolver(photo);
    })
  }

  public savePhoto(photo: Photo): Observable<any> {
    return this.http.post<any>(this.photosURL, photo);
  }

  patchPhoto(id:number,photo:Photo){
    this.dataStore.photos.forEach(p=>{
      if(p.id==id)
        photo=p;
    })
    const url = `${this.photosURL}/${id}`;
    return this.http.patch(url, photo) .subscribe(
      (val) => {
          // console.log("PATCH call successful value returned in body",  val);
      },
      response => {
          // console.log("PATCH call in error", response);
      },
      () => {
          // console.log("The PATCH observable is now completed.");
      });
  }

}
