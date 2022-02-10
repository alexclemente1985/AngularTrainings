import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { DropzoneComponent } from './upload-files/dropzone/dropzone.component';


@NgModule({
  declarations: [
    UploadFilesComponent,
    MyFilesComponent,
    DropzoneComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [
    UploadFilesComponent, MyFilesComponent, DropzoneComponent, MaterialModule
  ]
})
export class ComponentsModule { }
