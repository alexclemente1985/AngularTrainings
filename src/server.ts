import cors from "cors";
import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(cors);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
