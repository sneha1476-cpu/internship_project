const express = require("express");

const commonRouter = require("./routes/common_api");
; // ✅ ADD THIS

const app = express();
app.use(express.json());

app.use("/auth", commonRouter);
// ✅ ADD THIS

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
