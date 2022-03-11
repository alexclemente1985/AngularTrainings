import { SearchPeopleController } from "./SearchPeopleController";
import { SearchPeopleService } from "./SearchPeopleService";

const searchPeopleService = new SearchPeopleService();
const searchPeopleController = new SearchPeopleController(searchPeopleService);

export { searchPeopleController };
