import { jwtVerify, SignJWT } from "jose";

interface UserJwtPlayload {
  jti: string;
  iat: number;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_secret_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The enviroment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPlayload;
  } catch (error) {
    throw new Error("Your token has expired");
  }
};
