const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json({ id })
    },

    async index(request, response) {
        const { page = 1 } = request.query

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents').select('*')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.name',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },


    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();


        function ownsProperty(obj) { // Checks if the object has attributes
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return true;
            }
        }

        if (!ownsProperty(incidents)) {
            return response.status(401).json({ error: 'Incident does not exist.' });
        }

        if (incidents.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })// Não autorizado!
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};