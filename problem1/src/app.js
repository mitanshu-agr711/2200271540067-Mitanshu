import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";


const app = express();

app.get("/", (req, res) => {
    res.send("hello I run");
});

app.use(cors({
  origin: "*",
  credentials: true,  
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(cookieParser());

  



console.log("Server running...");

export { app };
