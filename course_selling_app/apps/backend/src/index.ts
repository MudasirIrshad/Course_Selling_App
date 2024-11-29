import express from "express";
import { connectDatabase } from "@repo/common/config";
import adminRouter from './routes/admin'
import bodyParser from "body-parser";

connectDatabase();
const app = express();
app.use(bodyParser.json())
const port = 3000;
app.listen(port, () => {
  console.log("running on port " + port);
});

app.use('/admin',adminRouter)