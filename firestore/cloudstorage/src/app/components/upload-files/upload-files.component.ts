import { Component, OnInit } from '@angular/core';
import { async, map, Observable, tap } from 'rxjs';
import { FileEntry } from 'src/app/models/FileEntry';
import { FilesService } from 'src/app/services';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  files: FileEntry[] = [];

  constructor(
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
  }

  onDropFiles(files: FileList){
    this.files.splice(0, this.files.length)
    for(let i = 0; i<files.length;i++){
      //this.filesService.upload(files.item(i) as File);
      this.files.push({
        file: files.item(i) as File,
        percentage: null,
        uploading: null,
        bytesUploaded: null,
        canceled: null,
        error: null,
        finished: null,
        paused: null,
        state: null,
        task: null,
      } as unknown as FileEntry)
    }
  }

  removeFileFromList(i: number){
    this.files.splice(i,1);
  }

  uploadAll(){
    console.log('files : ',this.files, this.files[0].paused)
    for(let i = 0; i<this.files.length; i++){
      this.filesService.upload(this.files[i]);
    }
  }

  ngDoCheck(){
    console.log('file paused ', (this.files[0]?.percentage));
  }

}
