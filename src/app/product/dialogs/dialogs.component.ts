import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit{

  showEdit:boolean=false;
  showDelete:boolean=false;

  constructor(public router:Router,
    public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.showEdit=this.data.variable1;
    this.showDelete=this.data.variable2;
  }
  onClose(): void {
    this.dialogRef.close();
    if(this.showEdit)
      this.router.navigate(['/products',this.data.productId]);
      this.router.navigate(['/']);
  }
}
