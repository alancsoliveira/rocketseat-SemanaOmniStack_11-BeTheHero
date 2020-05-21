const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); // Zera o banco de dados antes de cada teste
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able a to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'IdVálidoDaONG')
            .send({
                name: "NWGAMES",
                email: "NWGAMES@gmail.com",
                whatsapp: "8599555555",
                city: "Fortaleza",
                uf: "CE"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});

