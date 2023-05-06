import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, tap, of, map, withLatestFrom, delay } from 'rxjs';
import { Course } from '../../models/course';
import { Lesson } from '../../models/lesson';
import { CourseEntityService } from '../../services/course-entity/course-entity.service';
import { CoursesHttpService } from '../../services/courses-http/courses-http.service';
import { LessonEntityService } from '../../services/lesson-entity/lesson-entity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  course$!: Observable<Course>;

  lessons$: Observable<Lesson[]> = of([]);

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  dataSource = new MatTableDataSource();

  loading$!:Observable<boolean>;

  constructor(
    private coursesService: CourseEntityService,
    private lessonsService: LessonEntityService,
    //private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.find(course => course.url == courseUrl))
      ) as Observable<Course>
    
    this.lessons$ = this.lessonsService.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if(this.nextPage == 0){
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) => lessons.filter(lesson => lesson.courseId == course.id))
      );

    
    this.loading$ = this.lessonsService.loading$;
    this.cdref.detectChanges();
    /**  Solução do professor para problema com loading mudando no mesmo ciclo de vida */
    //this.loading$ = this.lessonsService.loading$.pipe(delay(0))
    

    

    /**MÉTODO SEM NGRX-DATA */
    /* if(courseUrl){
      this.course$ = this.coursesService.findCourseByUrl(courseUrl);

      this.lessons$ = this.course$.pipe(
        concatMap(course => this.coursesService.findLessons(course.id)),
        //tap((v) => this.dataSource = v)
      );

      this.lessons$.subscribe((l) => {this.dataSource.data = l})
    } */
    

  }

 /*  ngAfterViewInit(){
    this.lessons$.subscribe((l) => {this.dataSource.data = l})
  } */

  ngAfterViewInit(){
    this.lessons$.subscribe(lessons => this.dataSource.data = lessons)
  }


  loadLessonsPage(course: Course) {
    this.lessonsService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': 3
    });

    this.nextPage++;
  }
}
