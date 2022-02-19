import { BreadCrumbItem } from './../../../../shared/interfaces/bread-crumb-item';
import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { Category } from "src/app/pages/categories/shared/models/category.model";
import { ActionButton } from 'src/app/shared/interfaces/action-button';

export class Entry extends BaseResourceModel{
  constructor(
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category,
  ){
    super();
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  }

  static fromJson(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
  }

  static breadCrumbTypes: BreadCrumbItem = {
    text: 'Lançamentos',
    link: '/entries'
  }

  static actionButtonConfig: ActionButton = {
    text: '+ Novo Lançamento',
    link: 'new',
    class: 'btn-success'
  }

  get paidText(): string{
    return this.paid ? 'Pago' : 'Pendente';
  }
}
