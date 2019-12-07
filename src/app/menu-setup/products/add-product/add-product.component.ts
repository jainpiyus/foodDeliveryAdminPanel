import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/ICategory';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categoryPath: Category[] = [
    {
      id: -1,
      name: 'Root',
      imageLink: '',
      parentCategoryId: -1
    }
  ];
  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryByParentId(-1).subscribe(res => {
      this.categories = res;
    });
    this.productForm = this.fb.group({
      name: [],
      sortDescription: [],
      description: [],
      price: [],
      createdDate: [new Date().toUTCString()],
      active: [true],
      imageLink: [],
      type:['veg'],
      categoryId:[]
    });
  }
  getCategory(category: Category) {
    this.updateCategoryPath(category);
    this.categoryService.getCategoryByParentId(category.id).subscribe(res => {
      this.categories = res;
    });
  }
  updateCategoryPath(category: Category) {
    const tempIndex = this.categoryPath.indexOf(category);
    if (tempIndex == -1) {
      this.categoryPath.push(category);
    } else {
      this.categoryPath = this.categoryPath.slice(0, tempIndex + 1);
    }
  }

  onProductFormSubmit() {
    this.productForm.controls['categoryId'].patchValue(this.categoryPath[this.categoryPath.length -1].id);
    this.productService.addProduct(this.productForm.value).subscribe(res => {
    //  this.openSnackBar('Successfully created');
      this.router.navigate(['/menu-setup/products/list']);
    });
  }
}
