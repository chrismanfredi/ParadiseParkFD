import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const staffRole = pgEnum("staff_role", [
  "firefighter",
  "captain",
  "chief",
  "admin",
]);

export const trainingFormat = pgEnum("training_format", [
  "in_person",
  "virtual",
  "hybrid",
]);

export const enrollmentStatus = pgEnum("enrollment_status", [
  "registered",
  "attended",
  "missed",
  "excused",
]);

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  authId: text("auth_id").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: staffRole("role").default("firefighter").notNull(),
  station: text("station"),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const trainings = pgTable("trainings", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  format: trainingFormat("format").default("in_person").notNull(),
  durationMinutes: integer("duration_minutes").default(60).notNull(),
  minimumRole: staffRole("minimum_role").default("firefighter").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const trainingSessions = pgTable("training_sessions", {
  id: serial("id").primaryKey(),
  trainingId: integer("training_id")
    .references(() => trainings.id, { onDelete: "cascade" })
    .notNull(),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }).notNull(),
  location: text("location").notNull(),
  capacity: integer("capacity"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const trainingEnrollments = pgTable("training_enrollments", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .references(() => trainingSessions.id, { onDelete: "cascade" })
    .notNull(),
  staffId: integer("staff_id")
    .references(() => staff.id, { onDelete: "cascade" })
    .notNull(),
  status: enrollmentStatus("status").default("registered").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  location: text("location").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdByStaffId: integer("created_by_staff_id").references(() => staff.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  staffId: integer("staff_id").references(() => staff.id, { onDelete: "set null" }),
  volunteerRole: text("volunteer_role"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Staff = typeof staff.$inferSelect;
export type NewStaff = typeof staff.$inferInsert;
export type Training = typeof trainings.$inferSelect;
export type NewTraining = typeof trainings.$inferInsert;
export type TrainingSession = typeof trainingSessions.$inferSelect;
export type NewTrainingSession = typeof trainingSessions.$inferInsert;
export type TrainingEnrollment = typeof trainingEnrollments.$inferSelect;
export type NewTrainingEnrollment = typeof trainingEnrollments.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type NewEventRegistration = typeof eventRegistrations.$inferInsert;
