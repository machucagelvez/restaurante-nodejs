const path = require('path'); //Módulo path
const express = require('express'); //Usar Express
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express(); //Crear un "objeto" de Express

//Connecting to DB
mongoose.connect('mongodb://localhost/bdrestaurante')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//Importing routes
const indexRoutes = require('./routes/index'); //Importando index de la carpeta routes


//Settings
app.set('port', process.env.PORT || 4000); //Toma el puerto del SO, si no se asigna usa el 3000 
app.set('views', path.join(__dirname, 'views')); //Configura la ruta de la carpeta views. Normalmente está en la raíz
app.set('view engine', 'ejs'); //Configura el uso de ejs, este es para las vistas (es js embebido en html)


//Middlewares (funciones que se ejecutan antes de llegar a las rutas)
app.use(morgan('dev')); //Ejecuta morgan, sirve para ver en consola las peticiones y respuestas que se envían
app.use(express.urlencoded({extended: false})); //Sirve para que el servidor entienda los datos que se envían desde un formulario (desde las vistas)

//Routes
app.use('/', indexRoutes); //Esto hace que cuando un usuario entre a la ruta ppal (/) se usen las rutas que hay en indexRoutes

//Starting de server
//app.get('port') es el puerto que se definió previamente
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

