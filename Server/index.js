import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoutes.js";
import cors from "cors"

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`server is running as port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", route);

// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import route from "./routes/userRoutes.js";

// const app = express();
// app.use(bodyParser.json());
// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const MONGOURL = process.env.MONGO_URL

// mongoose
// .connect(MONGOURL)
// .then(()=>{
//     console.log("DB Connected Succesfully")
//     app.listen(PORT,()=>{
//         console.log(`server is running as port : ${PORT}`)
//     })
// })
// .catch((error)=>console.log(error))

// app.use("/api", route)