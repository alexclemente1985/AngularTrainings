import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, map, Observable, tap } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { CourseEntityService } from '../services/course-entity/course-entity.service';
import { allCoursesLoaded, loadAllCourses } from '../store/actions/courses.actions';
import { areCoursesLoaded } from '../store/selectors/courses.selectors';

/* alimenta a rota com dados antes dela ser apresentada
* evita de a rota ser iniciada em branco
*/
@Injectable()
export class CoursesResolverService{

    loading: boolean = false

  constructor(
    private coursesService: CourseEntityService,
    private store: Store<AppState>
    ) { }
  
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

            return this.coursesService.loaded$
                .pipe(
                    tap(loaded => {
                        if(!loaded){
                            this.coursesService.getAll();
                        }
                    }),
                    filter(loaded => loaded),
                    /* garante que assim que o primeiro valor for emitido, o observable será concluído */
                    first()
                )
            
            /**Implementação com CourseEntityService mas sem controle por meio da variável de loading */
            /* return this.coursesService.getAll()
            .pipe(
                map((courses) => !!courses)
            ); */

            /** MÉTODO USANDO FORMA CONVENCIONAL (EFFECTS, REDUCERS, ACTIONS, ETC...) */
           /*  return this.store
            .pipe(
                select(areCoursesLoaded),
                tap((coursesLoaded)=> {
                    if(!this.loading && !coursesLoaded){
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(),
                finalize(()=> this.loading = false)
            )
 */
    /* return this.coursesService.loaded$
    .pipe(
        tap((loaded: any) => {
            if (!loaded) {
               this.coursesService.getAll();
            }
        }),
        filter((loaded: any) => !!loaded),
        first()
    ); */

}
}


