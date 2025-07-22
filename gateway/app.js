import express from "express";
import expressProxy from "express-http-proxy";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use("/user", expressProxy("http://localhost:3001"));
app.use("/captain", expressProxy("http://localhost:3002"));
app.use("/ride", expressProxy("http://localhost:3003"));

app.listen(3000, () => {
  console.log("Gateway running on port 3000");
});
