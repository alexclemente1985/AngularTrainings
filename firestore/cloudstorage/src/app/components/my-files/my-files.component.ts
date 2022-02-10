import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileEntry } from 'src/app/models/FileEntry';
import { MyFile } from 'src/app/models/MyFile';
import { FilesService } from 'src/app/services';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  files!: Observable<MyFile[]>;

  constructor(
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
    this.files = this.filesService.getFiles();
  }

  delete(f: MyFile){
    this.filesService.deleteFile(f);
  }

  getDate(n: any) {
    return new Date(n);
  }

}
