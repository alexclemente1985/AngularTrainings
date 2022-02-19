import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/models/entry.model';
import { EntryService } from '../shared/services/entry.service';
import { BreadCrumbItem } from 'src/app/shared/interfaces/bread-crumb-item';
import { ActionButton } from 'src/app/shared/interfaces/action-button';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  resourceBreadCrumb: BreadCrumbItem;
  actionButtonConfig: ActionButton;

  constructor(
    private entryService: EntryService
  ) {
    super(entryService);
    this.resourceBreadCrumb = Entry.breadCrumbTypes;
    this.actionButtonConfig = Entry.actionButtonConfig;
   }
}
