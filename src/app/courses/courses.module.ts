import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from '../about/about.component';
import {CourseComponent} from './course/course.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {CourseDialogComponent} from './course-dialog/course-dialog.component';
import {BrowserModule} from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ReactiveFormsModule} from '@angular/forms';
import {CoursesService} from './services/courses.service';
import {courseResolver} from './services/course.resolver';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        CourseComponent,
        CoursesCardListComponent,
        CourseDialogComponent
    ],
    imports: [
        CommonModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule
    ],
    exports: [
        HomeComponent,
        AboutComponent,
        CourseComponent,
        CoursesCardListComponent,
        CourseDialogComponent
    ],
    providers: [
        CoursesService
    ]
})export class CoursesModule {



}



