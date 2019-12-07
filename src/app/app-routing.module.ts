import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MenuSetupComponent } from './menu-setup/menu-setup.component';
import { CategoryComponent } from './menu-setup/category/category.component';
import { ProductsComponent } from './menu-setup/products/products.component';
import { ProductListComponent } from './menu-setup/products/product-list/product-list.component';
import { AddProductComponent } from './menu-setup/products/add-product/add-product.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { DeliveryBoyListComponent } from './delivery-boy/delivery-boy-list/delivery-boy-list.component';
import { AddDeliveryBoyComponent } from './delivery-boy/add-delivery-boy/add-delivery-boy.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent
  },
  {
    path: 'reports', component: ReportsComponent
  },
  {
    path: 'delivery-boy', component: DeliveryBoyComponent, children: [
      {
        path: 'list', component: DeliveryBoyListComponent
      },
      {
        path: 'add', component: AddDeliveryBoyComponent
      },
      {
        path: 'add/:id', component: AddDeliveryBoyComponent
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'list'
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'list'
      }
    ]
  },
  {
    path: 'menu-setup', component: MenuSetupComponent, children: [
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'products', component: ProductsComponent, children: [

          {
            path: 'list', component: ProductListComponent
          },
          {
            path: 'add', component: AddProductComponent
          },
          {
            path: 'add/:id', component: AddProductComponent
          },
          {
            path: '', pathMatch: 'full', redirectTo: 'list'
          },
          {
            path: '**', pathMatch: 'full', redirectTo: 'list'
          },

        ]
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'products'
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'products'
      },
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      {
        path: 'list', component: UserListComponent
      },
      {
        path: 'create', component: AddUserComponent
      },
      {
        path: 'create/:id', component: AddUserComponent
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'list'
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'list'
      },
    ]
  },
  {
    path: 'orders', component: OrdersComponent, children: [
      {
        path: 'list', component: OrderListComponent
      },
      {
        path: 'create', component: CreateOrderComponent
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'list'
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'list'
      },
    ]
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'dashboard'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
