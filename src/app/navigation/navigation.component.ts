import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddNewProductComponent } from '../product/products-add-new/add-new-product.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit{

  showEdit:boolean=false;
  @Input() showButtons = false;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  openAddContactDialog():void {
    let dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('This is dialog results', result);
      if (result) {
        this.openSnackBar('Contacted added', 'Navigate')
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/products', result.id]);
          });
      }
    });
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  newPhoto() {}
  ngOnInit() {
  }
}
