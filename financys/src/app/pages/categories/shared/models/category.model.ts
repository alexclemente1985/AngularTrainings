import { ActionButton } from "src/app/shared/interfaces/action-button";
import { BreadCrumbItem } from "src/app/shared/interfaces/bread-crumb-item";
import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class Category extends BaseResourceModel{
    constructor(
        public name?: string,
        public description?: string
    ){
      super();
    }

    static breadCrumbTypes: BreadCrumbItem = {
      text: 'Categorias',
      link: '/categories'
    }

    static actionButtonConfig: ActionButton = {
      text: '+ Nova Categoria',
      link: 'new',
      class: 'btn-success'
    }

    static fromJson(jsonData: any): Category{
      return Object.assign(new Category(), jsonData);
    }
}
