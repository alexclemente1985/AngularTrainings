import { Router } from "express";
import { listPeopleController } from "../useCases/listPeople";
import { searchPeopleController } from "../useCases/searchPeople";

const personRoutes = Router();

personRoutes.get("/", (req, res) => {
  return listPeopleController.handle(req, res);
});

personRoutes.get("/:text", (req, res) => {
  return searchPeopleController.handleFindByText(req, res);
});

export { personRoutes };
