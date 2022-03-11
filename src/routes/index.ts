import { Router } from "express";
import { personRoutes } from "./person.routes";

const router = Router();

router.use("/person", personRoutes);

router.use((req, res, next) => {
  res.status(404).send({ message: "Route does not exist." });
});

export { router };
