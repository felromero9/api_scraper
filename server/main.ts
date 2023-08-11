import apiFactory from "./api";
import express from "express";

const port = 3000;

(async () =>{
  const app = express();
  const api = await apiFactory();

  app.use('/api', api);

  try {
    app.listen(port);
    console.log(`Server running on port: ${port}`);    
  } catch (error) {
    console.error(`Error running server, Error: ${error}`);
  }
})();

