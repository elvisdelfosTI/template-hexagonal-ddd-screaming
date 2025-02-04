import axios, { type AxiosInstance } from 'axios';
import type { AuthorDto } from '../../../../src/lib/Author/application/UsesCases/UserSave/AuthorSaveDTO';
import { AuthorStub } from '../domain/AuthorStub';

describe('ExpressAuthorRouter', () => {
	let api: AxiosInstance;

	beforeAll(() => {
		const port = process.env.PORT_REST || 3000;
		api = axios.create({
			baseURL: `http://localhost:${port}/api/v1`,
			validateStatus: (status) => {
				return status >= 200 && status < 500;
			},
		});
	});

	const createAuthor = async (author: Omit<AuthorDto, 'id'>) => {
		const response = await api.post('/author', author);
		expect(response.status).toBeGreaterThanOrEqual(200);
		return response.data.data;
	};

	const loginAuthor = async (credentials: {
		email: string;
		password: string;
	}) => {
		const response = await api.post('/auth/login', credentials);
		expect(response.status).toBeGreaterThanOrEqual(200);
		expect(response.data.data.token).toBeDefined();
		return response.data.data.token;
	};

	const deleteAuthor = async (authorId: number, token: string) => {
		const response = await api.delete(`/author/${authorId}`, {
			headers: { Authorization: token },
		});
		expect(response.status).toBeGreaterThanOrEqual(200);
	};

	describe('GET /author', () => {
		it('should get all authors', async () => {
			// Arrange
			const author = AuthorStub.generateDTOWithoutId();
			const id = await createAuthor(author);
			const token = await loginAuthor({
				email: author.email,
				password: author.password,
			});
			const response = await api.get('/author', {
				headers: { Authorization: token },
			});
			expect(response.data.status).toBe(200);
			expect(Array.isArray(response.data.data)).toBe(true);

			// Cleanup
			await deleteAuthor(id, token);
		});
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
	});

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
		});
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
		});
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
		});
	});
});
