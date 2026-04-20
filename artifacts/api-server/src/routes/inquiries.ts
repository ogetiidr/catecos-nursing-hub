import { Router } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import {
  CreateInquiryBody,
  ListInquiriesResponse,
  UpdateInquiryParams,
  UpdateInquiryBody,
  GetAdminStatsResponse,
} from "@workspace/api-zod";
import { servicesTable } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = Router();

const serializeInquiry = (i: any) => ({ ...i, createdAt: i.createdAt instanceof Date ? i.createdAt.toISOString() : i.createdAt });

router.post("/inquiries", async (req, res) => {
  try {
    const body = CreateInquiryBody.parse(req.body);
    const [inquiry] = await db.insert(inquiriesTable).values(body).returning();
    return res.status(201).json(serializeInquiry(inquiry));
  } catch (err) {
    req.log.error({ err }, "Failed to create inquiry");
    return res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/admin/inquiries", requireAdmin, async (req, res) => {
  try {
    const inquiries = await db.select().from(inquiriesTable).orderBy(desc(inquiriesTable.createdAt));
    const parsed = ListInquiriesResponse.safeParse(inquiries.map(serializeInquiry));
    if (!parsed.success) return res.status(500).json({ error: "Invalid data" });
    return res.json(parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to list inquiries");
    return res.status(500).json({ error: "Server error" });
  }
});

router.patch("/admin/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = UpdateInquiryParams.parse({ id: Number(req.params.id) });
    const body = UpdateInquiryBody.parse(req.body);
    const [inquiry] = await db
      .update(inquiriesTable)
      .set({ isRead: body.isRead })
      .where(eq(inquiriesTable.id, id))
      .returning();
    if (!inquiry) return res.status(404).json({ error: "Not found" });
    return res.json(serializeInquiry(inquiry));
  } catch (err) {
    req.log.error({ err }, "Failed to update inquiry");
    return res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/admin/stats", requireAdmin, async (req, res) => {
  try {
    const [totalInqResult] = await db.select({ count: sql<number>`count(*)::int` }).from(inquiriesTable);
    const [unreadInqResult] = await db.select({ count: sql<number>`count(*)::int` }).from(inquiriesTable).where(eq(inquiriesTable.isRead, false));
    const [totalSvcResult] = await db.select({ count: sql<number>`count(*)::int` }).from(servicesTable);
    const [totalTestResult] = await db.select({ count: sql<number>`count(*)::int` }).from(testimonialsTable);

    const stats = {
      totalInquiries: totalInqResult.count,
      unreadInquiries: unreadInqResult.count,
      totalServices: totalSvcResult.count,
      totalTestimonials: totalTestResult.count,
    };

    const parsed = GetAdminStatsResponse.safeParse(stats);
    if (!parsed.success) return res.status(500).json({ error: "Invalid data" });
    return res.json(parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
