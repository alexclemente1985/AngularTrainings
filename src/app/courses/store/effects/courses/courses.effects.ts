import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs';
import { CoursesHttpService } from 'src/app/courses/services/courses-http/courses-http.service';
import { CourseActions } from '../../actions';
import { allCoursesLoaded } from '../../actions/courses.actions';



@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action => 
          this.coursesHttpService.findAllCourses()
        ),
        tap(v => console.log('eitcha no effect de loadCourse: ', v)),
        map(courses => allCoursesLoaded({courses}))
      )
  );

  saveCourses$ = createEffect(
    () => this.actions$
            .pipe(
              ofType(CourseActions.courseUpdated),
              /* garante que os saves aconteçam de maneira sequencial */
              concatMap(action => this.coursesHttpService.saveCourse(
                action.update.id,
                action.update.changes
              ))
            ),
            {dispatch: false}
  )
}
