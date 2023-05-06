import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesCardListComponent } from './components/courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './components/edit-course-dialog/edit-course-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { compareCourses } from './models/course';
import { compareLessons } from './models/lesson';
import { CourseEntityService } from './services/course-entity/course-entity.service';
import { CoursesDataService } from './services/courses-data/courses-data.service';
import { CoursesHttpService } from './services/courses-http/courses-http.service';
import { LessonEntityService } from './services/lesson-entity/lesson-entity.service';
import { CoursesResolverService } from './resolvers/courses.resolver.service';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/effects/courses/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, coursesReducer } from './store/reducers/course.reducers';

const entityMetadata: EntityMetadataMap = {
  Course: {
      sortComparer: compareCourses,
      entityDispatcherOptions: {
          optimisticUpdate: true
      }
  },
  Lesson: {
      sortComparer: compareLessons
  }
};

@NgModule({
  declarations: [
    HomeComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(coursesFeatureKey, coursesReducer)
  ],
  exports: [
    HomeComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent
  ],
  providers: [
    CoursesResolverService,
    CoursesHttpService,
    CourseEntityService,
    LessonEntityService,
    CoursesDataService
  ]
})
export class CoursesModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService) {

    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Course', coursesDataService);

}
 }
