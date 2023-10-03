const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
app.listen(process.env.API_PORT);

app.get("/", async (req, resp) => {
  resp.send("App Running Successfully!!!!!");
});
