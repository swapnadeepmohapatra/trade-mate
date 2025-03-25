import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
};

// export let options = {
//   stages: [
//     { duration: "2s", target: 2 }, // Ramp-up to 50 users
//     { duration: "4s", target: 4 }, // Stay at 100 users
//     { duration: "2s", target: 0 }, // Ramp-down to 0 users
//   ],
// };

function login() {
  let loginRes = http.post(
    "https://trademate.swapnadeep.com/api/auth/login",
    JSON.stringify({
      username: "",
      password: "",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, { "login success": (r) => r.status === 200 });

  let cookies = loginRes.cookies;
  return cookies;
}

export default function () {
  let cookies = login();

  let res = http.get("https://trademate.swapnadeep.com/api/brokers/", {
    headers: {
      Cookie: `session=${cookies.jwt[0].value}`,
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
