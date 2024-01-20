const app = require('./app')

const {connectDatabase} = require('./config/database');

const db_string = 'mongodb+srv://mekryptic:VNQxx6eS5CkIJ32G@cluster0.glr034d.mongodb.net/?retryWrites=true&w=majority'

connectDatabase(db_string)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})