import { Author } from 'src/lib/Author/domain/entities/Author';
import { IAuthorRepository } from 'src/lib/Author/domain/AuthorRepository';
import { AuthorId } from 'src/lib/Author/domain/AuthorId';

export class InMemoryAuthorRepository implements IAuthorRepository {
  private authors: Author[];

  constructor(authors: Author[] = []) {
    this.authors = authors;
  }

  save(author: Author): Promise<void> {
    this.authors.push(author);
    return Promise.resolve();
  }

  getAll(): Promise<Author[]> {
    return Promise.resolve(this.authors);
  }

  getById(id: AuthorId): Promise<Author | undefined> {
    return Promise.resolve(
      this.authors.find((author) => author.id.value === id.value),
    );
  }

  edit(author: Author): Promise<Author | undefined> {
    const index = this.authors.findIndex(
      (author) => author.id.value === author.id.value,
    );
    if (index !== -1) {
      this.authors[index].age.value = author.age.value;
      this.authors[index].name.value = author.name.value;
      this.authors[index].email.value = author.email.value;
      this.authors[index].password.value = author.password.value;
      return Promise.resolve(this.authors[index]);
    }
    return Promise.resolve(undefined);
  }

  delete(id: AuthorId): Promise<Author | undefined> {
    const authors = this.authors.filter(
      (author) => author.id.value !== id.value,
    );
    this.authors = authors;
    return Promise.resolve(undefined);
  }
}
