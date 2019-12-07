import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DeliveryBoyService } from 'src/app/services/delivery-boy.service';

@Component({
  selector: 'app-add-delivery-boy',
  templateUrl: './add-delivery-boy.component.html',
  styleUrls: ['./add-delivery-boy.component.scss']
})
export class AddDeliveryBoyComponent implements OnInit {

  deliveryBoyForm: FormGroup;
  deliveryBoyId: number;
  constructor(private fb: FormBuilder, private deliveryBoyService: DeliveryBoyService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) {
    this.deliveryBoyId = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    if (this.deliveryBoyId) {
      this.deliveryBoyService.getDeliveryBoyById(this.deliveryBoyId).subscribe(res => {
        this.deliveryBoyForm.patchValue(res);
      });
    }
  }

  ngOnInit() {
    this.deliveryBoyForm = this.fb.group({
      name: [],
      mobileNumber: [],
      mailId: [],
      city: [],
      dob:[],
      address: [],
      gender: ["male"],
      indentityNumber:[],
      licenceNumber:[],
      licenceExpiryDate: [],
      createdDate: [new Date().toUTCString()],
      status: ["Online"]
    });
  }

  onFormSubmit() {
    if (this.deliveryBoyId) {
      this.deliveryBoyForm.addControl('id', new FormControl(this.deliveryBoyId));
      this.deliveryBoyService.updateDeliveryBoy(this.deliveryBoyForm.value).subscribe(res => {
        this.openSnackBar('Successfully updated');
        this.router.navigate(['/delivery-boy/list']);
      });
    } else {
      this.deliveryBoyService.addDeliveryBoy(this.deliveryBoyForm.value).subscribe(res => {
        this.openSnackBar('Successfully created');
        this.router.navigate(['/delivery-boy/list']);
      });
    }

  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 500,
    });
  }

}
