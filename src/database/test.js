const database = require('./db.js')
const saveOrphanage = require('./saveOrphanage')

database.then(async(db) => {
    // inserir dados na tabela
    await saveOrphanage(db, {
        lat: "-27.222633",
        lng: "-49.6455874",
        name: "Lar das meninas",
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis similique placeat rerum eveniet nostrum quibusdam pariatur officia eaque nisi itaque, quam, ex beatae qui quo eos numquam veniam magnam ullam?",
        whatsapp: "11998545678",
        images: [
            "https://source.unsplash.com/random?id=1",
            "https://source.unsplash.com/random?id=2"
        ].toString(),
        instructions: "Venha se sentir a vontade e traga muito amor e paciencia",
        opening_hours: "Horário de visitas da 18h até 8h",
        open_on_weekends: "0"
    })

    // consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

    // consultar somente 1 orfanato pelo id
    
    // const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1"')
    // console.log(orphanage)

    // deletar dado da tabela
    // await db.run('DELETE FROM orphanages WHERE id = "4"')
})