import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defaultDialogConfig } from 'src/app/shared/config/default-dialog-config';
import { Course } from '../../models/course';
import { CourseEntityService } from '../../services/course-entity/course-entity.service';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent {
  @Input()
  courses!: Course[] | null;

  @Output()
  courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private courseService: CourseEntityService) {
  }

  ngOnInit() {

  }

  editCourse(course:Course) {

      const dialogConfig = defaultDialogConfig();

      dialogConfig.data = {
        dialogTitle:"Edit Course",
        course,
        mode: 'update'
      };

      this.dialog.open(EditCourseDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe(() => this.courseChanged.emit());

  }

onDeleteCourse(course:Course) {

      this.courseService.delete(course)
          .subscribe(
            {
             next: () => console.log("Delete completed"),
             error: (err: any) => console.log("Deleted failed", err)}
          );


}
}
