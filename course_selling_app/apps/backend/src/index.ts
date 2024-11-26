import express from "express";
import { connectDatabase } from "@repo/common/config";
import adminRouter from './routes/admin'
connectDatabase();
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("running on port " + port);
});

app.use('/admin',adminRouter)