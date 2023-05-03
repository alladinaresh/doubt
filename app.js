const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const addDays = require("date-fns/addDays");

const dataBasePath = path.join(__dirname, "todoApplication.db");

const app = express();

let dataBase = null;

let initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: dataBasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Working on http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Data Base Error: ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.get("/todos/", (request, response) => {
  const {
    category = "",
    priority = "",
    status = "",
    due_date = "",
  } = request.query;

  const getTodosQuery = `
              SELECT
                  *
              FROM
                  todo
              WHERE 
                status = "${status}";

      `;
  let todoArray = dataBase.get(getTodosQuery);
  response.send(todoArray);
});
