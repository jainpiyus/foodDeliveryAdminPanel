import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#e6e6e6',
  flareFill: 'rgba(255,255,255, 0.5)',
};
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { MdePopoverModule } from '@material-extended/mde';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DelayInterceptor } from './services/delay-interceptor.service';
import { ChangeThemeComponent } from './change-theme/change-theme.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ProductFilterPipe } from './core/product-filter.pipe';
import { AddProductDialogComponent } from './orders/create-order/add-product-dialog/add-product-dialog.component';
import { CustomDatePipe } from './core/custom-date.pipe';
import { MomentModule } from 'ngx-moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule } from 'saturn-datepicker'
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { OrderFilterPipe } from './core/order-filter.pipe';
import { BigAmountConvertorPipe } from './core/big-amount-convertor.pipe';
import { OrderDateFilterPipe } from './core/order-date-filter.pipe';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MenuSetupComponent } from './menu-setup/menu-setup.component';
import { CategoryComponent } from './menu-setup/category/category.component';
import { ProductsComponent } from './menu-setup/products/products.component';
import { AddProductComponent } from './menu-setup/products/add-product/add-product.component';
import { ProductListComponent } from './menu-setup/products/product-list/product-list.component';
import { UserFilterPipe } from './core/user-filter.pipe';
import { ProductAttributeFilterPipe } from './core/product-attribute-filter.pipe';
import { ProductCategoryFilterPipe } from './core/product-category-filter.pipe';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { AddDeliveryBoyComponent } from './delivery-boy/add-delivery-boy/add-delivery-boy.component';
import { DeliveryBoyListComponent } from './delivery-boy/delivery-boy-list/delivery-boy-list.component';
import { TrackOrderComponent } from './orders/track-order/track-order.component';
import { AssignDeliveryBoyComponent } from './orders/assign-delivery-boy/assign-delivery-boy.component';
import { ReportsComponent } from './reports/reports.component';
import { VisitorChartComponent } from './reports/visitor-chart/visitor-chart.component';
import { ConversionRateChartComponent } from './reports/conversion-rate-chart/conversion-rate-chart.component';
import { AovChartComponent } from './reports/aov-chart/aov-chart.component';
import { CartAbandonmentChartComponent } from './reports/cart-abandonment-chart/cart-abandonment-chart.component';
import { RevenueChartComponent } from './reports/revenue-chart/revenue-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeThemeComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    OrdersComponent,
    UsersComponent,
    CreateOrderComponent,
    OrderListComponent,
    AddAddressComponent,
    ProductFilterPipe,
    AddProductDialogComponent,
    CustomDatePipe,
    OrderFilterPipe,
    BigAmountConvertorPipe,
    OrderDateFilterPipe,
    UserListComponent,
    AddUserComponent,
    MenuSetupComponent,
    CategoryComponent,
    ProductsComponent,
    AddProductComponent,
    ProductListComponent,
    UserFilterPipe,
    ProductAttributeFilterPipe,
    ProductCategoryFilterPipe,
    DeliveryBoyComponent,
    AddDeliveryBoyComponent,
    DeliveryBoyListComponent,
    TrackOrderComponent,
    AssignDeliveryBoyComponent,
    ReportsComponent,
    VisitorChartComponent,
    ConversionRateChartComponent,
    AovChartComponent,
    CartAbandonmentChartComponent,
    RevenueChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatSortModule,
    MatPaginatorModule,
    MdePopoverModule,
    NgxSkltnModule.forRoot(skltnConfig),
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SatDatepickerModule,
    MomentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [AddAddressComponent, AddProductDialogComponent, TrackOrderComponent, AssignDeliveryBoyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
