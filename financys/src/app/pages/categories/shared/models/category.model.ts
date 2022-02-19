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

    static fromJson(jsonData: any): Category{
      return Object.assign(new Category(), jsonData);
    }
}
