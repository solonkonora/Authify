import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config  from "../../config";

/**
 * Generate a JWT token
 * @param payload - The payload to encode in the token
 * @returns The generated JWT token
 */
export function generateToken(
  payload: string | object | Buffer,
  options?: SignOptions
): string {
  const signOptions: SignOptions = {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    ...(options || {}),
  };
  return jwt.sign(payload, config.jwtSecret, signOptions);
}

/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded token payload
 */
export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, config.jwtSecret);
}

/**
 * Decode a JWT token without verification (use with caution)
 * @param token - The JWT token to decode
 * @returns The decoded token payload
 */
export function decodeToken(token: string): null | { [key: string]: any } | string {
  return jwt.decode(token);
}