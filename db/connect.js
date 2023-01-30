const mongo = require('mongoose')


mongo.set("strictQuery", false);
mongo.connect('mongodb+srv://rango:wUDPbtLUp7ZDQZQr@cluster0.2bxued0.mongodb.net/restorent_manager?retryWrites=true&w=majority')
.then(()=>console.log('connected to db....')).catch(e=>console.log('oops..',e))
