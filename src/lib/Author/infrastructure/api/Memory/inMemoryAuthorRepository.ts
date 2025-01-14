import { Author } from 'src/lib/Author/domain/entities/Author';
import { AuthorId } from 'src/lib/Author/domain/AuthorId';
import { IAuthorRepository } from 'src/lib/Author/domain/AuthorRepository';

export class InMemoryAuthorRepository implements IAuthorRepository {
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
    console.log(id);
    return Promise.resolve(
      this.Authors.find((u: Author) => u.id.value === id.value),
    );
  }
  edit(id: AuthorId): Promise<Author | undefined> {
    console.log('Method not implemented.');
    console.log(id);
    throw new Error(`Method not implemented.${id}`);
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
