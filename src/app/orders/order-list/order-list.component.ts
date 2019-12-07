import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSort, MatTableDataSource, MatSortable, Sort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { element } from 'protractor';
import { OrderFilterPipe } from 'src/app/core/order-filter.pipe';
import { Order } from 'src/app/interfaces/IOrder';
import { OrderDateFilterPipe } from 'src/app/core/order-date-filter.pipe';
import { AssignDeliveryBoyComponent } from '../assign-delivery-boy/assign-delivery-boy.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [OrderFilterPipe, OrderDateFilterPipe]
})
export class OrderListComponent implements OnInit {
  orders = new Array();
  masterOrders = new Array();
  statusList = ['All', 'Pending', 'Accepted', 'Delivered', 'Rejected', 'On The Way'];
  selectedStatus: string;
  selectedDeliveryType: string;
  deliveryType = ['All', 'Delivery', 'Pick up'];
  displayedColumns: string[] = ['#', 'orderId', 'name', 'mobileNumber', 'totalAmount', 'orderDate', 'status', 'action'];
  dataSource: any;
  statusCards = new Array();
  afterPendingStatus = [
    "Pending", "Accepted", "Rejected"
  ];
  afterAcceptStatus = [
    "Accepted", "Delivered"
  ];
  afterOnTheWayStatus = [
    "On The Way", "Delivered"
  ];
  selectedDateRange: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private orderService: OrdersService,
    private _snackBar: MatSnackBar,
    private orderFilter: OrderFilterPipe,
    private orderDateFilter: OrderDateFilterPipe,
    public dialog: MatDialog) {

  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(res => {
      this.masterOrders = res;
      this.orders = res;
      this.defaultFilterSelection();
    });
  }
  resetOrderListWithMaster() {
    this.orders = this.masterOrders;
  }
  updateTableDataAndCalculateStatusCard() {
    this.transformOrders(this.orders);
    this.dataSource = new MatTableDataSource(this.orders);
    this.enableSorting();
    this.dataSource.paginator = this.paginator;
    this.calculateStatusCard();
  }
  transformOrders(orders) {
    this.orders = this.orderFilter.transform(orders, this.selectedStatus, this.selectedDeliveryType);
  }
  onStatusChange() {
    this.resetOrderListWithMaster();
    this.updateTableDataAndCalculateStatusCard();
  }
  onDeliveryTypeChange() {
    this.resetOrderListWithMaster();
    this.updateTableDataAndCalculateStatusCard();
  }

  defaultFilterSelection() {
    this.selectedStatus = "All";
    this.selectedDeliveryType = "All";
    this.selectedDateRange = null;
    this.resetOrderListWithMaster();
    this.updateTableDataAndCalculateStatusCard();
  }
  calculateStatusCard() {
    this.statusCards = [];
    let pendingOrders = 0;
    let acceptedOrders = 0;
    let deliveredOrders = 0;
    let rejectedOrders = 0;
    let onTheWayOrders = 0;
    this.orders.forEach(value => {
      if (value.status === 'Pending') {
        pendingOrders++;
      }
      if (value.status === 'Accepted') {
        acceptedOrders++;
      }
      if (value.status === 'Delivered') {
        deliveredOrders++;
      }
      if (value.status === 'Rejected') {
        rejectedOrders++;
      }
      if (value.status === 'On The Way') {
        onTheWayOrders++;
      }
    });

    this.statusCards.push({ status: 'Pending', no: pendingOrders, color: 'yellowgreen' });
    this.statusCards.push({ status: 'Accepted', no: acceptedOrders, color: 'lightgreen' });
    this.statusCards.push({ status: 'Delivered', no: deliveredOrders, color: 'green' });
    this.statusCards.push({ status: 'Rejected', no: rejectedOrders, color: 'red' });
    this.statusCards.push({ status: 'On The Way', no: onTheWayOrders, color: 'violet' });
    this.statusCards.push({ status: 'Total', no: (pendingOrders + acceptedOrders + deliveredOrders + onTheWayOrders + rejectedOrders), color: 'mediumvioletred' });

  }

  enableSorting() {

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'orderDate': {
          let newDate = new Date(item.orderDate).toLocaleString();
          return newDate;
        }
        default: {
          console.log('Inside default sort');
          return item[property];
        }
      }
    };
    this.sort.direction = 'desc';
    this.sort.active = 'orderDate';
    this.dataSource.sort = this.sort;
  }
  changeStatus(order) {
    this.orderService.updateOrder(order).subscribe(res => {
      this.openSnackBar('Order is successfully updated', 'close');
      this.resetOrderListWithMaster();
      this.updateTableDataAndCalculateStatusCard();
    });
  }
  onChangeDateRange() {
    const from = new Date(this.selectedDateRange.begin.toLocaleString());
    const to = new Date(this.selectedDateRange.end.toLocaleString());
    this.orders = this.orderDateFilter.transform(this.masterOrders, from, to);
    this.updateTableDataAndCalculateStatusCard();
  }


  assignDeliveryBoyDialog(order: Order): void {
    const dialogRef = this.dialog.open(AssignDeliveryBoyComponent, {
      // width: '250px',
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.openSnackBar("Delivery Boy is assign successfully", null);
        this.resetOrderListWithMaster();
        this.updateTableDataAndCalculateStatusCard();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

