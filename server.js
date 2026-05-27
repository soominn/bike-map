import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const seoulApiKey = process.env.SEOUL_OPENAPI_KEY;
if (!seoulApiKey) {
  throw new Error(
    "Missing SEOUL_OPENAPI_KEY. Create a .env file (see .env.example).",
  );
}
const kakaoMapAppKey = process.env.KAKAO_MAP_APP_KEY;
if (!kakaoMapAppKey) {
  throw new Error(
    "Missing KAKAO_MAP_APP_KEY. Create a .env file (see .env.example).",
  );
}

app.use(express.static(process.cwd()));

app.get("/config.js", (req, res) => {
  res.type("application/javascript; charset=utf-8");
  res.send(
    `window.APP_CONFIG=${JSON.stringify({ kakaoMapAppKey })};`,
  );
});

app.get("/api/bikeList/:start/:end", async (req, res) => {
  const { start, end } = req.params;

  const url = `http://openapi.seoul.go.kr:8088/${encodeURIComponent(
    seoulApiKey,
  )}/json/bikeList/${encodeURIComponent(start)}/${encodeURIComponent(end)}/`;

  const upstream = await fetch(url);
  const text = await upstream.text();

  res.status(upstream.status);
  res.setHeader(
    "content-type",
    upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
  );
  res.send(text);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

