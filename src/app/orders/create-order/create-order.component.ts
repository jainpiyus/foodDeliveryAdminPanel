import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { AddAddressComponent } from 'src/app/add-address/add-address.component';
import { RasturantService } from 'src/app/services/rasturant.service';
import { Customer } from 'src/app/interfaces/ICustomer';
import { Category } from 'src/app/interfaces/ICategory';
import { Address } from 'src/app/interfaces/IAddress';
import { Product } from 'src/app/interfaces/IProduct';
import { CustomerService } from 'src/app/services/customer.service';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  seachProduct = '';
  searchCustomer: Customer;
  customerControl = new FormControl();
  addressCtrl = new FormControl();
  productCtrl = new FormControl();
  customers: Customer[] = new Array();
  categories: Category[] = new Array();
  cartItems: Product[] = new Array();


  addresses: Address[] = new Array();

  products: Product[] = new Array();


  filteredCustomers: Observable<Customer[]>;

  filteredAddresses: Observable<Address[]>;

  filteredProducts: Observable<Product[]>;


  orderForm: FormGroup;

  enableDeliveryFee = true;

  deliveryTypes = ["Delivery", "Pick up"];
  selectedDeliveryType = this.deliveryTypes[0];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resturantService: RasturantService,
    private productService: ProductService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.resturantService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.customerService.getAllCustomers().subscribe(res => {
      this.customers = res;
      this.filteredCustomers = this.customerControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._customerfilter(name) : this.customers.slice())
        );
    });
  }

  getAddressesByCustomerId(id: number) {
    this.addresses = this.customers.find((customer) => customer.id === id).addresses;
    if (this.addresses.length > 0) {
      this.setDefaultAddressToSearchorderForm();
    }
  }
  setDefaultAddressToSearchorderForm() {
    this.orderForm.controls['address'].patchValue(this.addresses.find((address) => address.default).address);
  }
  onCustomerSelect(item) {
    this.searchCustomer = item;
    this.orderForm.patchValue(this.searchCustomer);
    this.getAddressesByCustomerId(item.id);
  }
  clearSearchCustomer() {
    this.searchCustomer = null;
    this.orderForm.reset();
    this.addresses = [];
  }
  getProducts(id) {
    this.products = [];
    this.productService.getProductsByCategoryId(id).subscribe(res => {
      this.products = res;
      this.filteredProducts = this.productCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._productFilter(name) : this.products.slice())
        );
      this.enableSelectedProduct();
    });
  }
  onCategorySelect(item) {
    this.seachProduct = null;
    this.getProducts(item.value.id);
  }


  openAddressDialog(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addresses.push(result);
        this.setDefaultAddressToSearchorderForm();
      }
    });
  }
  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  ngOnInit() {


    this.filteredAddresses = this.addressCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.address),
        map(address => address ? this._addressFilter(address) : this.addresses.slice())
      )


    this.orderForm = this.fb.group({
      firstName: [],
      lastName: [],
      mobileNumber: [],
      mailId: [],
      address: [],
      itemList: [new Array()],
      status: ['Pending'],
      orderDate: [new Date().toUTCString()],
      totalAmount: [0],
      deliveryType: ["Delivery"]
    });
  }

  displayFn(user?: Customer): string | undefined {
    return user ? user.firstName + " " + user.lastName : undefined;
  }
  addressDisplayFn(user?: Address): string | undefined {
    return user ? user.address : undefined;
  }

  productDisplayFn(user?: Product): string | undefined {
    return user ? user.name : undefined;
  }


  private _customerfilter(name: string): Customer[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.mobileNumber.toLowerCase().indexOf(filterValue) === 0 || option.firstName.toLowerCase().indexOf(filterValue) === 0 || option.lastName.toLowerCase().indexOf(filterValue) === 0);
  }
  private _addressFilter(name: string): Address[] {
    const filterValue = name.toLowerCase();
    return this.addresses.filter(item => item.address.toLowerCase().indexOf(filterValue) === 0);
  }
  private _productFilter(name: string): Product[] {
    if (!this.products || !name) {
      return this.products;
    }
    return this.products.filter(item => item.name.toUpperCase().indexOf(name.toUpperCase()) !== -1);
  }


  calculateTotalPriceOfCart(): number {
    let total = 0;
    this.cartItems.forEach(element => {
      total = total + (element.price * element.quantity);
    });
    return total;
  }


  selectAddress(id: number) {
    this.addresses.find((address => address.default)).default = false;
    this.addresses.find((address => address.id == id)).default = true;
    this.setDefaultAddressToSearchorderForm();
  }

  updateCartItemInOrderForm() {
    this.orderForm.controls['itemList'].patchValue(this.cartItems);
    this.updateTotalAmount();
  }
  updateTotalAmount() {
    let totalAmount = 0;
    totalAmount = this.calculateTotalPriceOfCart() + (this.calculateTotalPriceOfCart() * 18 / 100);
    this.orderForm.controls['totalAmount'].patchValue(totalAmount);
    this.updateDeliveryAmount();
  }

  updateDeliveryAmount() {
    let amount = this.orderForm.value.totalAmount;
    if (this.selectedDeliveryType === "Delivery") {
      amount = this.orderForm.value.totalAmount + 50;
      this.enableDeliveryFee = true;
    } else {
      this.enableDeliveryFee = false;
    }
    this.orderForm.controls['totalAmount'].patchValue(amount);
  }
  addItemDialog(meal): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '650px',
      data: meal
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartItems.push(result);
        this.updateCartItemInOrderForm();
        this.openSnackBar('Cart is updated successfully', 'close');
      }
    });
  }
  enableSelectedProduct() {
    this.cartItems.forEach(cartItem => {
      this.products.forEach(item => {
        if (cartItem.id === item.id) {
          item.quantity = cartItem.quantity;
        }
      });
    });
  }
  deleteItemFromCart(item) {
    for (let index = 0; index < this.cartItems.length; index++) {
      if (this.cartItems[index].id === item.id) {
        this.cartItems[index].quantity = 0;
        this.cartItems.splice(index, 1);
        this.openSnackBar('Item is removed successfully', 'close');
      }
    }
    this.updateCartItemInOrderForm();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 500,
    });
  }
  onDeliveryTypeSelect() {
    this.orderForm.controls['deliveryType'].patchValue(this.selectedDeliveryType);
    this.updateTotalAmount();
  }
  createOrder() {
    this.orderService.createOrder(this.orderForm.value).subscribe(res => {
      this.openSnackBar('Order is successfully placed', 'close');
      this.router.navigate(['/orders']);
    }, err => {
      this.openSnackBar('Error in placing order', 'close');
    });
  }
}


