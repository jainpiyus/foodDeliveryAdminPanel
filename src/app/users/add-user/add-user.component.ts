import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  customerId: number;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) {
    this.customerId = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        this.userForm.patchValue(res);
      });
    }
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [],
      lastName: [],
      mobileNumber: [],
      mailId: [],
      createdDate: [new Date().toUTCString()],
      addresses: [new Array()],
      active: [true]
    });
  }

  onUserFormSubmit() {
    if (this.customerId) {
      this.userForm.addControl('id', new FormControl(this.customerId));
      this.customerService.updateCustomer(this.userForm.value).subscribe(res => {
        this.openSnackBar('Successfully updated');
        this.router.navigate(['/users/list']);
      });
    } else {
      this.customerService.addCustomer(this.userForm.value).subscribe(res => {
        this.openSnackBar('Successfully created');
        this.router.navigate(['/users/list']);
      });
    }

  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 500,
    });
  }
}
