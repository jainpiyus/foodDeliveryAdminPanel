import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/ICategory';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryPath: Category[] = [
    {
      id: -1,
      name: 'root',
      imageLink: '',
      parentCategoryId: -1
    }
  ];
  categories: Category[];
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [],
      imageLink: [''],
      parentCategoryId: [-1],
      active: [true]
    });
    this.categoryService.getCategoryByParentId(-1).subscribe(res => {
      this.categories = res;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 1000,
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
  getCategory(category: Category) {
   this.updateCategoryPath(category);
    this.categoryService.getCategoryByParentId(category.id).subscribe(res => {
      this.categories = res;
    });
  }
  removeCategory(category: Category) {
    this.categories.splice(this.categories.indexOf(category), 1);
    this.categoryService.removeCategory(category.id).subscribe(res => {
    });
    this.openSnackBar(category.name + " is remove successfully.");
  }
  addCategory() {
    this.categoryForm.controls['parentCategoryId'].patchValue(this.categoryPath[this.categoryPath.length - 1].id);
    this.categoryService.addCategory(this.categoryForm.value).subscribe(res => {
      this.openSnackBar(this.categoryForm.value.name + " is added successfully.");
      this.getCategory(this.categoryPath[this.categoryPath.length - 1]);
      this.categoryForm.reset();
    });
    
  }

}
