require("dotenv").config();
const app = require("./app");
const { connection } = require("./db-connection");

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  connection.connect((err) => {
    if (err) return console.log(err.message);
    console.log(`🚀 Database is connected`);
  });
});
