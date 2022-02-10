import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, finalize, from, map, Observable, of, tap } from 'rxjs';
import { FileEntry } from 'src/app/models/FileEntry';
import { MyFile } from 'src/app/models/MyFile';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesCollection: AngularFirestoreCollection<MyFile>

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {
    this.filesCollection = afs.collection("myfiles", ref => ref.orderBy('date', 'desc'));
   }

  upload(f: FileEntry){
    const newfilename = `${(new Date()).getTime()} ${f.file.name}`;
    const path = `myfiles/${newfilename}`;
    f.task = this.storage.upload(path, f.file);
    f.state = f.task.snapshotChanges()
    .pipe(
      map(s => f.task.task.snapshot.state),
      catchError(s=>{
        return of(f.task.task.snapshot.state)
      })
    )
    this.fillAttributes(f);
    f.task.snapshotChanges()
    .pipe(
      finalize(()=>{
        if(f.task.task.snapshot.state == "success"){
          this.filesCollection.add({
            filename: f.file.name,
            path: path,
            date: (new Date()).getTime(),
            size: f.file.size
          })
        }
      })
    ).subscribe();
  }

  fillAttributes(f: FileEntry){
    console.log('task state ', f.task, f.state)
    f.percentage = f.task.percentageChanges() as Observable<number>;
    f.uploading = f.state.pipe(map(s => s == "running"));
    f.finished = from(f.task).pipe(map(s => s.state == "success"));
    f.paused = f.state.pipe(map(s => s == "paused"));
    f.error = f.state.pipe(map(s => s == "error"));
    f.canceled = f.state.pipe(map(s => s == "canceled"));
    f.bytesUploaded = f.task.snapshotChanges().pipe(map(s => s?.bytesTransferred as number));
  }

  getFiles(): Observable<MyFile[]>{
    return this.filesCollection.snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(a => {
          const file: MyFile = a.payload.doc.data();
          const id = a.payload.doc.id;
          const url = this.storage.ref(file.path).getDownloadURL();
          return { id, ...file, url };
        });
      }));
  }

  deleteFile(f: MyFile){
    this.storage.ref(f.path).delete();
    this.filesCollection.doc(f.id).delete();
  }
}
