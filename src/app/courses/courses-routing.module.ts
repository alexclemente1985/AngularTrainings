import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CourseComponent } from "./components/course/course.component";
import { HomeComponent } from "./containers/home/home.component";
import { CoursesResolverService } from "./resolvers/courses.resolver.service";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            courses: CoursesResolverService
        }
    },
    {
        path: ':courseUrl',
        component: CourseComponent,
        resolve: {
            courses: CoursesResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CoursesRoutingModule {}