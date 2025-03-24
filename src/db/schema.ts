import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
} from "drizzle-orm/pg-core";
<<<<<<< HEAD
import { relations, sql } from "drizzle-orm";
=======
import { relations } from "drizzle-orm";
>>>>>>> recovered-history

// ✅ User Table (exact match for NextAuth)
export const users = pgTable("user", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    stripeCustomerId: text("stripe_customer_id"),
    subscribed: boolean("subscribed"),
});

export const userRelations = relations(users, ({ many }) => ({
    quizzes: many(quizzes),
}));

// ✅ Quizzes Table (updated to match user.id correctly)
export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
<<<<<<< HEAD
    userId: text("userId").references(() => users.id, { onDelete: "set null" }).default(sql`NULL`),
   
=======
    userId: text("userId").references(() => users.id, { onDelete: "set null" }).default(null),
>>>>>>> recovered-history
});

export const quizzesRelations = relations(quizzes, ({ many, one }) => ({
    questions: many(questions),
    submissions: many(quizSubmissions),
}));

// ✅ Questions Table
export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    questionText: text("question_text"),
    quizId: integer("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }),
});
export const questionsRelations = relations(questions, ({ one, many }) => ({
    quiz: one(quizzes, {
        fields: [questions.quizId],
        references: [quizzes.id],
    }),
    answers: many(questionAnswers),
}));

// ✅ Answers Table
export const questionAnswers = pgTable("answers", {
    id: serial("id").primaryKey(),
    questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade" }),
    answerText: text("answer_text"),
    isCorrect: boolean("is_correct"),
});
export const questionAnswerRelations = relations(questionAnswers, ({ one }) => ({
    question: one(questions, {
        fields: [questionAnswers.questionId],
        references: [questions.id],
    }),
}));

// ✅ Accounts Table (exact NextAuth match: userId)
export const accounts = pgTable(
    "account",
    {
      userId: text("userId") // ✅ camelCase
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(), // ✅ Fixed to camelCase
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey(account.provider, account.providerAccountId),
    })
  );
  
// ✅ Session Table (exact match for NextAuth)
export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(), // ✅ "sessionToken" instead of "session_token"
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});


// ✅ Verification Token Table (exact match)
export const verificationTokens = pgTable(
    "verification_token",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey(verificationToken.identifier, verificationToken.token),
    })
);

export const quizSubmissions = pgTable("quiz_submissions", {
    id: serial("id").primaryKey(),
    quizId: integer("quiz_id"),
    score: integer("score"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const quizSubmissionsRelations = relations(quizSubmissions, ({ one, many }) => ({
    quiz: one(quizzes, {
        fields: [quizSubmissions.quizId],
        references: [quizzes.id],

    }),
})
);