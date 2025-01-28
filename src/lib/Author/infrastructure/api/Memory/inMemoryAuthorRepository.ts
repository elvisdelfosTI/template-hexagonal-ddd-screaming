import { Author } from '#author/domain/entities/Author';
import { AuthorId } from '#author/domain/AuthorId';
import { IAuthorRepository } from '#author/domain/AuthorRepository';
import { AuthorEmail } from '#author/domain/AuthorEmail';

export class InMemoryAuthorRepository implements IAuthorRepository {
  getByEmail(_email: AuthorEmail): Promise<Author | undefined> {
    throw new Error('Method not implemented.');
  }
  private Authors: Author[] = [];
  save(author: Author): Promise<void> {
    this.Authors.push(author);
    return Promise.resolve();
  }
  getAll(): Promise<Author[]> {
    //const listAuthor:Author[] = this.Authors.map((author: Author) => (author));
    const listAuthor = this.Authors.filter((author: Author) => author);
    return Promise.resolve(listAuthor);
  }
  getById(id: AuthorId): Promise<Author | undefined> {
    return Promise.resolve(
      this.Authors.find((u: Author) => u.id.value === id.value),
    );
  }
  edit(_author: Author): Promise<Author | undefined> {
    console.log('Method not implemented.');
    throw new Error(`Method not implemented`);
  }
  delete(id: AuthorId): Promise<Author | undefined> {
    const index = this.Authors.findIndex(
      (Author) => Author.id.value === id.value,
    );
    if (index !== -1) {
      const [deletedAuthor] = this.Authors.splice(index, 1);
      return Promise.resolve(deletedAuthor);
    }
    return Promise.resolve(undefined);
  }
}
