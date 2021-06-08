var express = require("express");
const htmlRoutes = require("./routes/hmtlRoutes.js")
const apiRoutes = require("./routes/apiRoutes.js")
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/', htmlRoutes);
app.use('/api/', apiRoutes);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});