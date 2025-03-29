import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../utils/config.js";
import axios from "axios";
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";

export const googleRedirect = async (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
  res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
  const { code } = req.query;

  console.log(code);

  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
          code,
        },
      }
    );

    if (!data) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to retrieve tokens" });
    }

    const { access_token } = data;
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const user = await req.prisma.user.findFirst({
      where: {
        email: userInfo.data.email,
      },
    });

    console.log(user);

    if (!user) {
      const newUser = await req.prisma.user.create({
        data: {
          name: userInfo.data.name,
          email: userInfo.data.email,
          password: "google-oauth",
        },
      });

      generateJWTTokenAndSetCookie(newUser.id, res);

      return res.redirect("https://trademate.swapnadeep.com/home");

      // return res.status(201).json({
      //   success: true,
      //   body: {
      //     user: {
      //       ...newUser,
      //       password: undefined,
      //     },
      //   },
      // });
    } else {
      generateJWTTokenAndSetCookie(user.id, res);

      return res.redirect("https://trademate.swapnadeep.com/home");

      // return res.status(200).json({
      //   success: true,
      //   body: {
      //     user: {
      //       ...user,
      //       password: undefined,
      //     },
      //   },
      // });
    }
  } catch (error) {
    console.error("OAuth Error:", error.message);
    res.status(500).json({ success: false, error: "Authentication failed" });
  }
};
