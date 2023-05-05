import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PhotoService } from '../data/photo-service';
import {  Photo } from '../data/photo';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loader:boolean=false;

  dataSource!: MatTableDataSource<Photo>;
  photos!: Photo[];
  displayedColumns: string[] = ['position', 'title', 'thumbnailUrl'];
  sub!: Subscription;
  errorMessage: any;

  count: number = 0;
  tableSize: number = 10;
  page: number = 1;
  tableSizes: any = "[5, 10, 15, 20]";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loader=true;
    this.sub = this.photoService.photos.subscribe({
      next:(photos)=>{
        this.photos = photos;
        this.dataSource= new MatTableDataSource<Photo>(this.photos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => (this.errorMessage = err),
      complete: () => {
        console.log('complete')
        // this.loader=false;
        // this.router.navigateByUrl('/all-products');
      }
    });
    this.photoService.loadAll();
    this.loader=false;
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
