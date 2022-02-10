import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  @Output() droppedFiles = new EventEmitter<FileList>();

  isDraggingOver = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDragOverEvent(event: DragEvent) {
    console.log(event)
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeaveEvent(event: DragEvent) {
    console.log(event)
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDropEvent(event: DragEvent) {
    console.log(event.dataTransfer?.files)
    event.preventDefault();
    this.droppedFiles.emit(event.dataTransfer?.files)
  }

}
