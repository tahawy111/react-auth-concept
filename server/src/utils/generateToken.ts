import jwt from "jsonwebtoken";

export enum TokenExpiration {
  Access = 5 * 60 * 1000,
  Refresh = 90 * 24 * 60 * 60 * 1000,
}

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: TokenExpiration.Access,
  });
};
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: TokenExpiration.Refresh,
  });
};
