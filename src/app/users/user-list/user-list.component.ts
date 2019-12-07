import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/ICustomer';
import { Router } from '@angular/router';
import { UserFilterPipe } from 'src/app/core/user-filter.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserFilterPipe]
})
export class UserListComponent implements OnInit {
  statusList = [
    {
      name: "All",
      value: "All"
    },
    {
      name: "Active",
      value: true
    },
    {
      name: "Inactive",
      value: false
    }];
  selectedStatus = this.statusList[0];
  statusCards = new Array();
  dataSource: any;
  masterUsers = new Array();
  users = new Array();
  displayedColumns: string[] = ['#', 'firstName', 'lastName', 'email', 'createdDate', 'status', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private customerService: CustomerService, private router: Router,
    private _snackBar: MatSnackBar,
    private userFilter: UserFilterPipe) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => {
      this.masterUsers = res;
      this.resetCustomersWithMaster();
      this.updateUserMatTable();
    });
  }
  updateUserMatTable() {
    this.transformUsers(this.users)
    this.dataSource = new MatTableDataSource(this.users);
    this.enableSorting();
    this.dataSource.paginator = this.paginator;
    this.calculateStatusCard();
  }
  transformUsers(users) {
    this.users = this.userFilter.transform(users, this.selectedStatus.value);
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

  calculateStatusCard() {
    this.statusCards = [];
    let activeUsers = 0;
    let inactiveUsers = 0;
    this.users.forEach(value => {
      if (value.active) {
        activeUsers++;
      }
      if (!value.active) {
        inactiveUsers++;
      }
    });

    this.statusCards.push({ status: 'Active', no: activeUsers, color: 'green' });;
    this.statusCards.push({ status: 'Inactive', no: inactiveUsers, color: 'red' });
    this.statusCards.push({ status: 'Total', no: (activeUsers + inactiveUsers), color: 'mediumvioletred' });
  }

  onStatusChange() {
    this.resetCustomersWithMaster();
    this.updateUserMatTable();
  }
  onDeleteUserClick(id: number) {
    this.customerService.deleteCustomer(id).subscribe(res => {
    });
    this.removeCustomerFromMaster(id);
  }
  removeCustomerFromMaster(id) {
    this.masterUsers.splice(this.masterUsers.findIndex(element => element.id == id), 1);
    this.resetCustomersWithMaster();
    this.updateUserMatTable();
  }
  resetCustomersWithMaster() {
    this.users = this.masterUsers;
  }
  editCustomer(customer: Customer) {
    this.router.navigate(['users/create/' + customer.id]);
  }
  onStatusToggle(customer: Customer) {
    customer.active = !customer.active;
    this.customerService.updateCustomer(customer).subscribe(res => { });
    this.resetCustomersWithMaster();
    this.updateUserMatTable();
    this.openSnackBar('User is Successfully Updated', 'Close');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
