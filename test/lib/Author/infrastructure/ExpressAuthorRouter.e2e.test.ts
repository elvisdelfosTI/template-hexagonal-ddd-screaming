import axios, { type AxiosInstance } from 'axios';
import type { AuthorDto } from '../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
import { AuthorStub } from '../domain/AuthorStub';

jest.setTimeout(30000); // Aumentamos el timeout global

describe('ExpressAuthorRouter', () => {
  let api: AxiosInstance;

  beforeAll(() => {
    const port = 3000;
    api = axios.create({
      baseURL: `http://localhost:${port}/api/v1`,
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
    });
  });

  const createAuthor = async (
    author: Omit<AuthorDto, 'id'>,
  ): Promise<number> => {
    const response = await api.post('/author', author);
    expect(response.status).toBe(201);
    return response.data.data;
  };

  const loginAuthor = async (credentials: {
    email: string;
    password: string;
  }): Promise<string> => {
    const response = await api.post('/auth/login', credentials);
    expect(response.status).toBe(200);
    const fullToken = response.data.data.token;
    if (!fullToken || typeof fullToken !== 'string') {
      throw new Error('No token received from login');
    }
    const token = fullToken;
    return token;
  };

  const deleteAuthor = async (
    authorId: number,
    token: string,
  ): Promise<void> => {
    const response = await api.delete(`/author/${authorId}`, {
      headers: { Authorization: token },
    });
    expect(response.status).toBe(200);
  };

  describe('GET /author', () => {
    it('should get all authors', async () => {
      const author = AuthorStub.generateDTOWithoutId();
      const data = await createAuthor(author);
      const token = await loginAuthor({
        email: author.email,
        password: author.password,
      });
      const response = await api.get('/author', {
        headers: { Authorization: token },
      });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.data)).toBe(true);

      await deleteAuthor(data, token);
    }, 10000);
  });

  it('should get author by id', async () => {
    const author = AuthorStub.generateDTOWithoutId();
    const id = await createAuthor(author);
    const token = await loginAuthor({
      email: author.email,
      password: author.password,
    });

    const response = await api.get(`/author/${id}`, {
      headers: { Authorization: token },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toHaveProperty('id', id);

    await deleteAuthor(id, token);
  }, 10000);

  describe('POST /author', () => {
    it('should create author successfully', async () => {
      const author = AuthorStub.generateDTOWithoutId();
      const id = await createAuthor(author);
      expect(id).toBeDefined();

      const token = await loginAuthor({
        email: author.email,
        password: author.password,
      });

      await deleteAuthor(id, token);
    }, 10000);
  });

  describe('PUT /author', () => {
    it('should update author successfully', async () => {
      const author = AuthorStub.generateDTOWithoutId();
      const id = await createAuthor(author);
      const token = await loginAuthor({
        email: author.email,
        password: author.password,
      });

      const updatedAuthor = { ...author, name: 'Walter White', id };
      const response = await api.put('/author', updatedAuthor, {
        headers: { Authorization: token },
      });

      expect(response.status).toBe(200);
      const getResponse = await api.get(`/author/${id}`, {
        headers: { Authorization: token },
      });
      expect(getResponse.data.data.name).toBe('Walter White');

      await deleteAuthor(id, token);
    }, 10000);
  });

  describe('POST /auth/login', () => {
    it('should login successfully', async () => {
      const author = AuthorStub.generateDTOWithoutId();
      const id = await createAuthor(author);
      const token = await loginAuthor({
        email: author.email,
        password: author.password,
      });
      expect(typeof token).toBe('string');
      await deleteAuthor(id, token);
    }, 10000);
  });
});
