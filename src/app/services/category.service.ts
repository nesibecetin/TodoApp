import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private afs: AngularFirestore,
    private ToastrService: ToastrService
  ) {}

  saveCategory(data: any) {
    return this.afs
      .collection('categories')
      .add(data)
      .then((ref) => {
       
        this.ToastrService.success('New category added successfully..');
      });
  }

  getCategories() {
    return this.afs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  updateCattegories(id: string, categoryName: string) {
    return this.afs
      .collection('categories')
      .doc(id)
      .update({ category: categoryName })
      .then((val) => {
        this.ToastrService.success('Updated Successfully');
      });
  }

  deleteCategories(id: string) {
    return this.afs
      .collection('categories')
      .doc(id)
      .delete()
      .then(() => {
        this.ToastrService.error('Deleted Catgeory Succesfully');
      });
  }
}
