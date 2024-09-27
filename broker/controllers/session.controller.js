import { getOAuthLinkForProvider } from "../services/OAuthLink/index.js";
import { getAccessTokenForProvider } from "../services/AccessToken/index.js";

export const getOAuthLink = async (req, res) => {
  try {
    const { provider } = req.body;

    if (!provider) {
      return res
        .status(400)
        .json({ success: false, error: "Provider is required" });
    }

    const redirect = "http://localhost:3000/auth";

    const oAuthLink = await getOAuthLinkForProvider(
      req.prisma,
      provider,
      redirect,
      req.user.userId
    );

    res.status(200).json({ success: true, body: { oAuthLink } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAccessToken = async (req, res) => {
  try {
    const { RequestToken, State, provider } = req.body;

    if (!RequestToken || !State || !provider) {
      return res
        .status(400)
        .json({ success: false, error: "RequestToken and State are required" });
    }

    const accessToken = await getAccessTokenForProvider(
      req.prisma,
      provider,
      RequestToken,
      State
    );

    res.status(200).json({ success: true, body: { accessToken } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
