import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {
  typeList = [
     "Home", "Office", "Other"      
  ];
  addressForm: FormGroup;
  selectedType:any;
  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { 
      this.addressForm = this.fb.group({
        address: [],
        title: ['Other'],
        default: [true],
        icon: ['room']
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    // onTypeSelect(value){
    //   if(value === 'Home'){
    //     this.addressForm.value.icon = 'home'
    //   } else if (value === 'Office'){
    //     this.addressForm.value.icon = 'work_outline'
    //   } else {
    //     this.addressForm.value.icon = 'room';
    //   }

    // }

    onAddressFormSubmit(){

    }
   

}
