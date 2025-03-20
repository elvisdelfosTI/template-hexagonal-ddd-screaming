import { Author as EntityAuthor } from "@author/domain/entities/Author";
import { db } from "@config/database/drizzle/drizzle";
import { eq } from "drizzle-orm";
import { author as AuthorTable } from '../../../../../drizzle/schema';
import { AuthorId } from "@author/domain/AuthorId";
import { AuthorEmail } from "@author/domain/AuthorEmail";
import { AuthorName } from "@author/domain/AuthorName";
import { AuthorPassword } from "@author/domain/AuthorPassword";
import { AuthorAge } from "@author/domain/AuthorAge";
import type { IAuthorRepository } from "@author/domain/AuthorRepository";
import { encrypt } from "@shared/infrastructure/security/encrypt/encrypt";

export class DrizzleAuthorRepository implements IAuthorRepository {
  async save(author: EntityAuthor): Promise<undefined | number> {
    const resolve = await db.insert(AuthorTable).values({
      id: author.id.value,
      name: author.name.value,
      email: author.email.value,
      password: await encrypt.encryptPassword(author.password.value),
      age: author.age.value,
      updatedAt: new Date().toISOString(),
    }).returning({ insertedId: AuthorTable.id });
    return resolve[0].insertedId;
  }
  async getAll(): Promise<EntityAuthor[]> {
    const authors = await db.query.author.findMany();
    return authors.map(
      (author: Record<string, unknown>) =>
        new EntityAuthor(
          new AuthorId(author.id as number),
          new AuthorName(author.name as string),
          new AuthorEmail(author.email as string),
          new AuthorPassword(author.password as string),
          new AuthorAge(author.age as number),
        ),
    );
  }
  async edit(author: EntityAuthor): Promise<EntityAuthor | undefined> {
    await db.update(AuthorTable).set({
      name: author.name.value,
      email: author.email.value,
      password: await encrypt.encryptPassword(author.password.value),
      age: author.age.value,
      updatedAt: new Date().toISOString(),
    }).where(eq(AuthorTable.id, author.id.value));
    return undefined;
  }
  async delete(id: AuthorId): Promise<EntityAuthor | undefined> {
    await db.delete(AuthorTable).where(eq(AuthorTable.id, id.value));
    return undefined;
  }
  async getByEmail(email: AuthorEmail): Promise<EntityAuthor | undefined> {
    const author = await db.query.author.findFirst({
      where: eq(AuthorTable.email, email.value),
    });
    return author ? new EntityAuthor(
      new AuthorId(author.id),
      new AuthorName(author.name),
      new AuthorEmail(author.email),
      new AuthorPassword(author.password),
      new AuthorAge(author.age),
    ) : undefined;
  }
  async getById(id: AuthorId): Promise<EntityAuthor | undefined> {
    const author = await db.query.author.findFirst({
      where: eq(AuthorTable.id, id.value),
    });
    return author ? new EntityAuthor(
      new AuthorId(author.id),
      new AuthorName(author.name),
      new AuthorEmail(author.email),
      new AuthorPassword(author.password),
      new AuthorAge(author.age),
    ) : undefined;
  }
}
