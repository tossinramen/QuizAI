import {
    timestamp, 
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

// ✅ Users Table
export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
});
export const userRelations = relations(users, ({ many }) => ({
    quizzes: many(quizzes)
})) 

// ✅ Accounts Table (OAuth)
export const accounts = pgTable(
    "accounts",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("provider_account_id").notNull(),
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

// ✅ Sessions Table
export const sessions = pgTable("sessions", {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ✅ Verification Tokens Table
export const verificationTokens = pgTable(
    "verification_tokens",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey(verificationToken.identifier, verificationToken.token),
    })
);

// ✅ Quizzes Table
export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
});

// ✅ Questions Table
export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    questionText: text("question_text"),
    quizId: integer("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }),
});

// ✅ Answers Table
export const questionAnswers = pgTable("answers", {
    id: serial("id").primaryKey(),
    questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade" }),
    answerText: text("answer_text"),
    isCorrect: boolean("is_correct"),
});

// ✅ Relations
export const quizzesRelations = relations(quizzes, ({ many }) => ({
    questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
    quiz: one(quizzes, {
        fields: [questions.quizId],
        references: [quizzes.id],
    }),
    answers: many(questionAnswers),
}));

export const questionAnswerRelations = relations(questionAnswers, ({ one }) => ({
    question: one(questions, {
        fields: [questionAnswers.questionId],
        references: [questions.id],
    }),
}));
