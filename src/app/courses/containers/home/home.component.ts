import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../../models/course';
import { MatDialog } from '@angular/material/dialog'
import { CourseEntityService } from '../../services/course-entity/course-entity.service';
import { defaultDialogConfig } from 'src/app/shared/config/default-dialog-config';
import { EditCourseDialogComponent } from '../../components/edit-course-dialog/edit-course-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
    
  promoTotal$!: Observable<number>;
  beginnerCourses$!: Observable<Course[]>;
  advancedCourses$!: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesService: CourseEntityService
  ){}

  ngOnInit(): void {
    this.reload();
  }

  reload(){

    /* MÉTODO CONVENCIONAL (EFFECTS, REDUCERS, SELECTORS, ACTIONS) */
   // this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    //this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    //this.promoTotal$ = this.store.pipe(select(selectPromoTotalCourses));

    /** MÉTODO COM CoursesEntityService */
      this.beginnerCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      )
      this.advancedCourses$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

      this.promoTotal$ = this.coursesService.entities$
       .pipe(
         map(courses => courses.filter(course => course.promo).length)
       );

  }

  onAddCourse(){
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

}
