import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Access denied. No token provided or invalid format.",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = verifyToken(token) as { userId: string };

      // Fetch user from database to ensure they still exist
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        return res.status(401).json({
          error: "Access denied. User not found.",
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.log("JWT verification failed:", jwtError);
      return res.status(401).json({
        error: "Access denied. Invalid token.",
      });
    }
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal server error during authentication.",
    });
  }
};
