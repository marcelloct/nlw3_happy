const Database = require('./database/db')
const saveOrphanage = require('./database/saveOrphanage')

module.exports = {
    index(req, res){
        return res.render('index')
    },

    async orphanage(req, res){
        const id = req.query.id
        try {
            const db = await Database
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]

            if(orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false
            } else {
                orphanage.open_on_weekends = true
            }
            // console.log(orphanage[0])
            
            return res.render('orphanage', {orphanage})
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
        
    },

    async orphanages(req, res){
        try{
            const db = await Database
            // colocar o orphanage pelo banco de dados
            const orphanages = await db.all("SELECT * FROM orphanages")
            return res.render('orphanages', {orphanages})
        }catch(error){
            console.log(error)
            return res.send('Erro no banco de dados')
        }
        
    },

    createOrphanage(req, res){
        return res.render('create-orphanage')
    },

    async saveOrphanage(req, res) {
        // console.log(req.body)
        const fields = req.body

        // validar se todos os campos estao preenchidos
        // console.log(Object.values(fields))

        if(Object.values(fields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

        try {
        // salvar um orfanato
         const db = await Database
        await saveOrphanage(db, {
            lat: fields.lat,
            lng: fields.lng,
            name: fields.name,
            about: fields.about,
            whatsapp: fields.whatsapp,
            images: fields.images.toString(),
            instructions: fields.instructions,
            opening_hours: fields.opening_hours,
            open_on_weekends: fields.open_on_weekends
        })
          
        // redirecionamento
        return res.redirect('/orphanages')
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
        
    },

    async updateOrphanage(req, res){
        const id = req.query.id
        try {
            const db = await Database
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const updateOrphanage = results[0]

            updateOrphanage.images = updateOrphanage.images.split(",")
            updateOrphanage.firstImage = updateOrphanage.images[0]

            if(updateOrphanage.open_on_weekends == "0") {
                updateOrphanage.open_on_weekends = false
            } else {
                updateOrphanage.open_on_weekends = true
            }
            // console.log(orphanage[0])
            
            return res.render('update-orphanage', {updateOrphanage})
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados')
        }
    }
}