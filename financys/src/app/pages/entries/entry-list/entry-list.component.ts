import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/models/entry.model';
import { EntryService } from '../shared/services/entry.service';
import { BreadCrumbItem } from 'src/app/shared/interfaces/bread-crumb-item';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  resourceBreadCrumb!: BreadCrumbItem;

  constructor(
    private entryService: EntryService
  ) {
    super(entryService);
    this.resourceBreadCrumb = Entry.breadCrumbTypes;
   }
}
