import { Request, Response } from "express";
import { SearchPeopleService } from "./SearchPeopleService";

class SearchPeopleController {
  constructor(private searchPeopleService: SearchPeopleService) {}

  handleFindByText(req: Request, res: Response) {
    this.searchPeopleService.findByText(req, res);
  }
}

export { SearchPeopleController };
