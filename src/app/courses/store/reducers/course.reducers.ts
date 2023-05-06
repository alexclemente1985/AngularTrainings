import { compareCourses, Course } from "../../models/course";
import {EntityState, createEntityAdapter, EntityAdapter} from '@ngrx/entity'
import { createReducer, on, select } from "@ngrx/store";
import { CourseActions } from "../actions";

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    //selectId: course => course.id
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(
        CourseActions.allCoursesLoaded,
        (state, action) => adapter.setAll(
            action.courses, 
            {
                ...state,
                allCoursesLoaded: true
            }
        )
    ),
    on(
        CourseActions.courseUpdated,
        (state, action) => 
            adapter.updateOne(action.update, state)
    )
)

export const {
    selectAll
} = adapter.getSelectors();

