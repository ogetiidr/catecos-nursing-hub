import { getAuth, clerkClient } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

const ADMIN_EMAIL = "catecos924@gmail.com";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);
  const userId = auth?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const adminEmail = user.emailAddresses.find(
      (e) => e.emailAddress === ADMIN_EMAIL && e.verification?.status === "verified"
    );

    if (!adminEmail) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
