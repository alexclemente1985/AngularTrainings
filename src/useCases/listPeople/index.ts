import { ListPeopleController } from "./ListPeopleController";
import { ListPeopleService } from "./ListPeopleService";

const listPeopleService = new ListPeopleService();
const listPeopleController = new ListPeopleController(listPeopleService);

export { listPeopleController };
