import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/ICategory';
import { ProductAttributeFilterPipe } from 'src/app/core/product-attribute-filter.pipe';
import { ProductCategoryFilterPipe } from 'src/app/core/product-category-filter.pipe';
import { element } from 'protractor';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductAttributeFilterPipe, ProductCategoryFilterPipe]
})
export class ProductListComponent implements OnInit {
  dataSource: any;
  masterProducts = new Array();
  products = new Array();
  statusCards = new Array();
  categories: Category[] = new Array();
  rootCategory: Category = {
    id: 0,
    imageLink: '',
    name: 'All',
    parentCategoryId: -1
  };

  selectedCategory: Category;
  productType = [
    {
      name: "All",
      value: "All"
    },
    {
      name: "Veg",
      value: "veg"
    },
    {
      name: "Non Veg",
      value: "nonveg"
    }
  ];
  selectedType = this.productType[0];
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
  displayedColumns: string[] = ['#', 'itemImage', 'name', 'categoryName', 'price', 'createdDate', 'status', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private productService: ProductService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private productAttributeFilter: ProductAttributeFilterPipe,
    private productCategoryFilter: ProductCategoryFilterPipe) {
    this.categories.push(this.rootCategory);
    this.selectedCategory = this.categories[0];
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(res => {
      this.masterProducts = res;
      this.resetProductsWithMaster();
      this.updateMatTable();
    });
    this.categoryService.getCategories().subscribe(res => {
      this.categories = this.categories.concat(res);

    });
  }
  updateMatTable() {
    this.transformProducts(this.products);
    this.dataSource = new MatTableDataSource(this.products);
    this.enableSorting();
    this.dataSource.paginator = this.paginator;
    this.calculateStatusCard();
  }
  transformProducts(products) {
    this.products = this.productAttributeFilter.transform(
      this.productCategoryFilter.transform(products, this.selectedCategory.id), 
      this.selectedStatus.value, 
      this.selectedType.value);
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
  resetProductsWithMaster() {
    this.products = this.masterProducts;
  }
  calculateStatusCard() {
    this.statusCards = [];
    let activeProducts = 0;
    let inactiveProducts = 0;
    this.products.forEach(value => {
      if (value.active) {
        activeProducts++;
      }
      if (!value.active) {
        inactiveProducts++;
      }
    });

    this.statusCards.push({ status: 'Active', no: activeProducts, color: 'green' });;
    this.statusCards.push({ status: 'Inactive', no: inactiveProducts, color: 'red' });
    this.statusCards.push({ status: 'Total', no: (activeProducts + inactiveProducts), color: 'mediumvioletred' });
  }
  onStatusToggle(product: Product) {
    product.active = !product.active;
    this.productService.updateProduct(product).subscribe(res => { });
    this.resetProductsWithMaster();
    this.updateMatTable();
    this.openSnackBar('Product is successfully updated', null);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  };
  onStatusChange() {
    this.resetProductsWithMaster();
    this.updateMatTable();
  }
  onProductTypeChange() {
    this.resetProductsWithMaster();
    this.updateMatTable();
  }
  onCategorySelect() {
    this.resetProductsWithMaster();
    this.updateMatTable();
  }
  getCategoryName(product: Product):string{
    for (let index = 0; index < this.categories.length; index++) {
      if (this.categories[index].id === product.categoryId) {
        return this.categories[index].name;
      }      
    }
  }
}
