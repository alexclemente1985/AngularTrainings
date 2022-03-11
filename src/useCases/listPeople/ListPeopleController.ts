import { Request, Response } from "express";
import { ListPeopleService } from "./ListPeopleService";

class ListPeopleController {
  constructor(private listPeopleService: ListPeopleService) {}

  handle(req: Request, res: Response) {
    this.listPeopleService.execute(req, res);
  }
}

export { ListPeopleController };
