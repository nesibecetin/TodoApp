import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private afs: AngularFirestore,
    private ToastrService: ToastrService
  ) {}

  saveTodo(todo: any, id: string) {
    this.afs
      .collection('categories')
      .doc(id)
      .collection('todos')
      .add(todo)
      .then(() => {
        this.afs.collection('categories').doc(id).update({todoCount:increment(1)})
        this.ToastrService.success('Todos added succesfully');
      });
  }

  getTodos(id: string) {
    return this.afs
      .collection('categories')
      .doc(id)
      .collection('todos')
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

  updateTodos(categoryId: string, todoId: string, todo: string) {
    return this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ todo: todo })
      .then(() => {
        this.ToastrService.success('Updated Successfully');
      });
  }
  deleteTodos(categoryId:string , todoId:string){
    return this.afs
    .collection('categories')
    .doc(categoryId)
    .collection('todos')
    .doc(todoId).delete().then(()=>{
      this.afs.collection('categories').doc(categoryId).update({todoCount:increment(-1)})
      this.ToastrService.error("Deleted Succesfully");
    })

  }
  markCompleted(categoryId:string ,todoId:string){
    return this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ isCompleted: true })
      .then(() => {
        this.ToastrService.info('Completed Successfully');
      });
  }

  markUnCompleted(categoryId:string ,todoId:string){
    return this.afs
      .collection('categories')
      .doc(categoryId)
      .collection('todos')
      .doc(todoId)
      .update({ isCompleted: false })
      .then(() => {
        this.ToastrService.info('UnCompleted Successfully');
      });
  }
}
