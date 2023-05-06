import { createAction, props } from "@ngrx/store";
import { Course } from "../../models/course";
import { CourseTypes } from "../types/course.types";
import {Update} from '@ngrx/entity';

export const loadAllCourses = createAction(
    CourseTypes.loadAllCourses
);

export const allCoursesLoaded = createAction(
    CourseTypes.allCoursesLoaded,
    props<{courses: Course[]}>()
)

export const courseUpdated = createAction(
   CourseTypes.courseUpdated,
   props<{update: Update<Course>}>()
)