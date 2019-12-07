import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

 
  itemCount = 1;
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    if (data.quantity > 0) {
      this.itemCount = data.quantity;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    this.itemCount = this.itemCount + 1;
  }
  remove() {
    this.itemCount = this.itemCount - 1;
  }
  ngOnInit() {
    // if (!this.data.deliveryDate) {
    //   this.data.deliveryDate = this.dates[0];
    //   this.data.deliveryTime = this.times[0];
    // }
  }

  addToCart() {
    this.data.quantity = this.itemCount;
  }

}
