import { relations } from "drizzle-orm/relations";
import { author, book } from "./schema";

export const bookRelations = relations(book, ({one}) => ({
	author: one(author, {
		fields: [book.authorId],
		references: [author.id]
	}),
}));

export const authorRelations = relations(author, ({many}) => ({
	books: many(book),
}));