import "reflect-metadata";
import mongoose from "mongoose";
import { container } from "../utils/container";
import { API } from "../API";

const CONNECTION_URL =
  "mongodb+srv://maksymilian_stoklosa:Test-pass1@cluster0.8zka4mc.mongodb.net/?retryWrites=true&w=majority";

try {
  initApp();
} catch (err) {
  console.log(err);
}

async function initApp() {
  const api = container.resolve(API);

  console.log("Server start connecting with database...");
  await mongoose
    .connect(CONNECTION_URL)
    .then(() => console.log("Server connected with database"))
    .catch((err) => console.error(err.message));

  await api.serve();
}
