import { Router } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  ListTestimonialsResponse,
  CreateTestimonialBody,
  DeleteTestimonialParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = Router();

const serializeTestimonial = (t: any) => ({ ...t, createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : t.createdAt });

router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt));
    const parsed = ListTestimonialsResponse.safeParse(testimonials.map(serializeTestimonial));
    if (!parsed.success) return res.status(500).json({ error: "Invalid data" });
    return res.json(parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to list testimonials");
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/admin/testimonials", requireAdmin, async (req, res) => {
  try {
    const body = CreateTestimonialBody.parse(req.body);
    const [testimonial] = await db.insert(testimonialsTable).values(body).returning();
    return res.status(201).json(testimonial);
  } catch (err) {
    req.log.error({ err }, "Failed to create testimonial");
    return res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/admin/testimonials/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = DeleteTestimonialParams.parse({ id: Number(req.params.id) });
    await db.delete(testimonialsTable).where(eq(testimonialsTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete testimonial");
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
