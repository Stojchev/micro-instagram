import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Photo } from '../data/photo';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../data/photo-service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent {
  sub!: Subscription;
  errorMessage: string | undefined;
  photo: Photo | undefined;
  delete:boolean=false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    public dialog: MatDialog,
  ) {}

  deleteProduct(id: number): void {
    this.delete=true;
    this.sub = this.photoService.deleteElement(id).subscribe({
      error: (err) => (this.errorMessage = err),
      complete: () => {
        const dialogRef = this.dialog.open(DialogsComponent, {
          data: {
            variable1: false,
            variable2: true
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      let id=params['id'];
      if(!id) id=1;
      this.photo=undefined;
      this.sub=this.photoService.photos.subscribe(()=>{
        this.photo=this.photoService.getById(id);
      })
    })
  }
}
