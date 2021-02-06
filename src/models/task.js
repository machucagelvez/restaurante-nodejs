//En este archivo se crea un esquema para los datos que se van a utilizar,
//como se van a ver los datos de la bd.
//mongoose se usa para definir el esquema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Se crea un nuevo esquema
//Se indica el tipo de datos que va a tener cada campo
//En el caso de status se indica el estado por defecto
const TaskSchema = new Schema({
    nombre: String,
    precio: Number,
    disponibilidad: Boolean    
})

//Utilizar el esquema
//'tasks' es una colección en la bd en donde se van almacenando las tareas de acuerdo con el esquema definido (TaskSchema) 
module.exports = mongoose.model('tasks', TaskSchema); //Se exporta para poder usarlo en otros archivos