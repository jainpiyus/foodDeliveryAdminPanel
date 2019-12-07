import { Component, OnInit, Inject } from '@angular/core';
import { DeliveryBoyService } from 'src/app/services/delivery-boy.service';
import { DeliveryBoy } from 'src/app/interfaces/IDeliveryBoy';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/interfaces/IOrder';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-assign-delivery-boy',
  templateUrl: './assign-delivery-boy.component.html',
  styleUrls: ['./assign-delivery-boy.component.scss']
})
export class AssignDeliveryBoyComponent implements OnInit {

  deliveryBoyList: DeliveryBoy[] = new Array();
  constructor(private deliveryBoyService: DeliveryBoyService,
    public dialogRef: MatDialogRef<AssignDeliveryBoyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private orderService: OrdersService) {
    this.deliveryBoyService.getAllDeliveryBoys().subscribe(res => {
      this.deliveryBoyList = res;
    });
  }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  assignDeliveryBoy(deliveryBoy: DeliveryBoy) {
    this.data.deliveryBoyId = deliveryBoy.id;
    this.data.status = "On The Way";
    this.orderService.updateOrder(this.data).subscribe(res => {
      this.dialogRef.close(this.data);
    });

  }
}
