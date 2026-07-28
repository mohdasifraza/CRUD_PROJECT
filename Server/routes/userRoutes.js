import express from "express";
import { create, deleteUser, getAllUser, getUserById, update } from "../controller/usercontroler.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUser);
route.get("/user/:id", getUserById );
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;


// import express from "express";

// import { create } from "../controller/usercontroler";

// const route = express.Router();

// route.post("/user",create)

// export default route;