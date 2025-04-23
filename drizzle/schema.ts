import { pgTable, uniqueIndex, serial, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const author = pgTable("Author", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	password: text().notNull(),
	age: integer().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("Author_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const book = pgTable("Book", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	publishedDate: timestamp({ precision: 3, mode: 'string' }).notNull(),
	pagesCount: integer().notNull(),
	isbn: text("ISBN").notNull(),
	authorId: integer().notNull(),
	createdAt: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	uniqueIndex("Book_ISBN_key").using("btree", table.isbn.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [author.id],
			name: "Book_authorId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);
