import axios from 'axios';
import { AuthorStub } from 'test/lib/Author/domain/UserStub';
const port = process.env.PORT_REST || 3000;
const API_URL = `http://localhost:${port}/api/v1`;

describe('ExpressAuthorRouter', () => {
  it('should get all authors', async () => {
    const author = AuthorStub.generateDTO();
    await axios.post(`${API_URL}/author`, author);

    const responseLogin = await axios.post(`${API_URL}/auth/login`, {
      email: author.email,
      password: author.password,
    });

    const responseGet = await axios.get(`${API_URL}/author`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
    expect(responseGet.status).toBe(200);
    await axios.delete(`${API_URL}/author/${author.id}`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
  });

  it('should get author by id', async () => {
    const author = AuthorStub.generateDTO();
    await axios.post(`${API_URL}/author`, author);

    const responseLogin = await axios.post(`${API_URL}/auth/login`, {
      email: author.email,
      password: author.password,
    });

    const responseGetById = await axios.get(`${API_URL}/author/${author.id}`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
    expect(responseGetById.status).toBe(200);

    await axios.delete(`${API_URL}/author/${author.id}`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
  });

  it('should create and delete author', async () => {
    const author = AuthorStub.generateDTO();
    const responseCreate = await axios.post(`${API_URL}/author`, author);
    expect(responseCreate.status).toBe(200);

    const responseLogin = await axios.post(`${API_URL}/auth/login`, {
      email: author.email,
      password: author.password,
    });
    expect(responseLogin.status).toBe(200);

    const responseDelete = await axios.delete(
      `${API_URL}/author/${author.id}`,
      {
        headers: {
          Authorization: responseLogin.data.token,
        },
      },
    );
    expect(responseDelete.status).toBe(200);
  });

  it('should update author', async () => {
    const author = AuthorStub.generateDTO();
    await axios.post(`${API_URL}/author`, author);

    const responseLogin = await axios.post(`${API_URL}/auth/login`, {
      email: author.email,
      password: author.password,
    });

    const updatedAuthor = { ...author, name: 'Walter White' };
    const responseUpdate = await axios.put(
      `${API_URL}/author/`,
      updatedAuthor,
      {
        headers: {
          Authorization: responseLogin.data.token,
        },
      },
    );
    expect(responseUpdate.status).toBe(200);

    await axios.delete(`${API_URL}/author/${author.id}`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
  });

  it('should login successfully', async () => {
    const author = AuthorStub.generateDTO();
    await axios.post(`${API_URL}/author`, author);

    const responseLogin = await axios.post(`${API_URL}/auth/login`, {
      email: author.email,
      password: author.password,
    });
    expect(responseLogin.status).toBe(200);
    expect(responseLogin.data.token).toBeDefined();

    await axios.delete(`${API_URL}/author/${author.id}`, {
      headers: {
        Authorization: responseLogin.data.token,
      },
    });
  });
});
