import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/models/entry.model';
import { EntryService } from '../shared/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll()
    .subscribe({
      next: (entries) => this.entries = entries.sort((a,b)=> (b.id as number) - (a.id as number)),
      error: () => alert("Erro ao carregar a lista")
    })
  }

  deleteEntry(entry: Entry){
    const mustDelete = confirm("Deseja realmente excluir este item?");

    if(mustDelete){
      this.entryService.delete(entry.id as number)
      .subscribe({
        next: () => this.entries = this.entries.filter(element => element != entry),
        error: (e) => alert("Erro ao tentar excluir")
      })
    }



  }

}
