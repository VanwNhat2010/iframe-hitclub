const express = require("express");
const request = require("request");
const app = express();

const TARGET_URL = "https://i.hit.club";

app.use("/", (req, res) => {
  const url = TARGET_URL + req.originalUrl;

  req.pipe(
    request({
      url,
      headers: {
        "User-Agent": req.headers["user-agent"],
        "Accept-Language": req.headers["accept-language"],
      },
    })
      .on("response", function (response) {
        // Xóa các headers ngăn iframe
        delete response.headers["x-frame-options"];
        delete response.headers["content-security-policy"];
      })
  ).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy server running on port", PORT);
});
