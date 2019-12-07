import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { OrdersService } from '../services/orders.service';
import { OrderFilterPipe } from '../core/order-filter.pipe';
import { Order } from '../interfaces/IOrder';
import { BigAmountConvertorPipe } from '../core/big-amount-convertor.pipe';
import { OrderDateFilterPipe } from '../core/order-date-filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OrderFilterPipe, OrderDateFilterPipe]
})
export class HomeComponent implements OnInit {
  selected = 'today';
  totalCustomers: number = 0;
  totalActiveOrders: number = 0;
  totalEarning: number = 0;
  totalOrders: Order[];
  kpiList = [
    "Sales Trend", "Visitor Trend", "Average Order Value", "Conversion Rate", "Cart Abandonment Rate"
  ];
  selectedKpi = this.kpiList[0];
  summaryDateList = [
    {
      title: "Today",
      from: new Date(),
      to: new Date()
    },
    {
      title: "Last 2 Days",
      from: (new Date(new Date().setDate(new Date().getDate() - 2))),
      to: new Date()
    },
    {
      title: "Last 1 Week",
      from: (new Date(new Date().setDate(new Date().getDate() - 7))),
      to: new Date()
    },
    {
      title: "Last 1 Month",
      from: (new Date(new Date().setDate(new Date().getDate() - 30))),
      to: new Date()
    }
  ];
  selectedSummaryDate = this.summaryDateList[0];
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[];
  constructor(
    private customerService: CustomerService,
    private orderService: OrdersService,
    private orderFilter: OrderFilterPipe,
    private orderDateFilter: OrderDateFilterPipe
  ) {
  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(res => {
      this.totalCustomers = Number.parseInt(res.length);
    });
    this.orderService.getAllOrders().subscribe(res => {
      this.totalOrders = res;
      this.calculateTotalActiveOrders(res);
      this.totalEarning = this.calculateTotalEarning(res);
      this.calculateSummary(res, new Date(), new Date());
    });

  }

  calculateTotalActiveOrders(res) {
    this.totalActiveOrders = this.orderFilter.transform(res, "Pending", "All").length;
    this.totalActiveOrders = this.totalActiveOrders + this.orderFilter.transform(res, "Accepted", "All").length;
    this.totalActiveOrders = this.totalActiveOrders + this.orderFilter.transform(res, "On The Way", "All").length;
  }
  calculateTotalEarning(orders: Order[]): number {
    let temp = 0;
    orders.forEach(element => {
      if (element.status !== "Rejected") {
        temp = temp + element.totalAmount;
      }
    });
    return temp;
  }
  calculateSummary(order: Order[], from, to) {
    this.transactions = [];
    const summaryOrders = this.orderDateFilter.transform(order, from, to);
    this.transactions.push({ item: 'Total Orders', cost: summaryOrders.length });
    this.transactions.push({ item: 'Sells', cost: this.calculateTotalEarning(summaryOrders) });
    this.transactions.push({ item: 'Panding Orders', cost: this.orderFilter.transform(summaryOrders, "Pending", "All").length });
    this.transactions.push({ item: 'Delivered Orders', cost: this.orderFilter.transform(summaryOrders, "Delivered", "All").length });
    this.transactions.push({ item: 'Rejected Orders', cost: this.orderFilter.transform(summaryOrders, "Rejected", "All").length });
  }

 

  onSummaryDateChange() {
    this.calculateSummary(this.totalOrders, this.selectedSummaryDate.from, this.selectedSummaryDate.to);
  }


}

export interface Transaction {
  item: string;
  cost: number;
}