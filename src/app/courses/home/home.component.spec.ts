import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { Course } from '../model/course';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  let beginnerCourses = setupCourses()
  .filter(course => course.category == 'BEGINNER');

  let advancedCourses = setupCourses()
  .filter(course => course.category == 'ADVANCED')


  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoursesModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceSpy
        }
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.inject(CoursesService);
    })
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).toBe(1,"Unexpected number of tabs found");

  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).toBe(1,"Unexpected number of tabs found");

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).toBe(2,"Unexpected number of tabs found");

  });


  it("[DOM] should display advanced courses when tab clicked",(done: DoneFn) => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    //el.nativeElement.click();
    click(tabs[1]);

    fixture.detectChanges();

    setTimeout(()=> {
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course","Could not find card title");
      done();
    }, 500)

    //flush();

   /*  fixture.whenStable().then(()=> {
      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

      console.log('CARD TITLES!!: ', cardTitles)

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course","Could not find card title");
   }) */

    

  });

});


