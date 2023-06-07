import { Component } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  faPencil = faPencil;
  faTrash = faTrash;

  categories: Array<any> = [];
  categoryName: string = '';
  buttonStatus: string = 'Add';
  categoryId: string = '';
  color: Array<any> = [
    '#81B996',
    '#12A5EE',
    '#FE8D46',
    '#FEB95E',
    '#F1D359',
    '#7BA697',
    '#F3B790',
    '#D08FA5',
    '#F7EEF1',
    '#FCEFE8',
    '#8E61E9',
    '#FF5AA6',
    '#C259E5',
    '#5F90F4',
    '#9194BC',
  ];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((val) => {
      this.categories = val;
      console.log(val);
    });
  }

  onSubmit(f: NgForm) {
    let randomColor = Math.floor(Math.random() * this.color.length);

    let categories = {
      category: f.value.category,
      colorCode: this.color[randomColor],
      todoCount: 0,
    };
    if (this.buttonStatus === 'Add') {
      this.categoryService.saveCategory(categories);
    } else {
      this.categoryService.updateCattegories(this.categoryId, f.value.category);
      console.log(f.value.category);
      console.log(this.categoryId);
      this.buttonStatus = 'Add';
      f.resetForm();
    }
  }

  OnEdit(id: string, categoryName: string) {
    this.categoryName = categoryName;
    this.buttonStatus = 'Edit';
    this.categoryId = id;
  }

  OnDelete(id:string){
    this.categoryService.deleteCategories(id);
  }
}
