import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DeliveryBoyService } from 'src/app/services/delivery-boy.service';
import { Router } from '@angular/router';
import { DeliveryBoy } from 'src/app/interfaces/IDeliveryBoy';

@Component({
  selector: 'app-delivery-boy-list',
  templateUrl: './delivery-boy-list.component.html',
  styleUrls: ['./delivery-boy-list.component.scss']
})
export class DeliveryBoyListComponent implements OnInit {

  dataSource: any;
  masterDeliveryBoys = new Array();
  deliveryBoys = new Array();
  displayedColumns: string[] = ['#', 'name', 'mobileNumber', 'email', 'status', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private deliveryBoyService: DeliveryBoyService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.deliveryBoyService.getAllDeliveryBoys().subscribe(res => {
      this.masterDeliveryBoys = res;
      this.resetDeliveryBoysWithMaster();
      this.updateDeliveryBoyMatTable();
    });
  }
  updateDeliveryBoyMatTable() {
    this.dataSource = new MatTableDataSource(this.deliveryBoys);
    this.enableSorting();
    this.dataSource.paginator = this.paginator;
  }

  enableSorting() {

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'createdDate': {
          let newDate = new Date(item.createdDate).toLocaleString();
          return newDate;
        }
        case 'status': {
          return item.status;
        }
        default: {
          console.log('Inside default sort');
          return item[property];
        }
      }
    };
    this.sort.direction = 'desc';
    this.sort.active = 'createdDate';
    this.dataSource.sort = this.sort;
  }


  onStatusChange() {
    this.resetDeliveryBoysWithMaster();
    this.updateDeliveryBoyMatTable();
  }
  onDeleteDeliveryBoyClick(id: number) {
    this.deliveryBoyService.deleteDeliveryBoy(id).subscribe(res => {
    });
    this.removeDeliveryBoyFromMaster(id);
  }
  removeDeliveryBoyFromMaster(id) {
    this.masterDeliveryBoys.splice(this.masterDeliveryBoys.findIndex(element => element.id == id), 1);
    this.resetDeliveryBoysWithMaster();
    this.updateDeliveryBoyMatTable();
  }
  resetDeliveryBoysWithMaster() {
    this.deliveryBoys = this.masterDeliveryBoys;
  }
  editDeliveryBoy(deliveryBoy: DeliveryBoy) {
    this.router.navigate(['delivery-boy/add/' + deliveryBoy.id]);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}
