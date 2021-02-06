const express = require('express');
const router = express.Router(); //Router es un método que devuelve un objeto

const Task = require('../models/task'); //Trayendo el esquema creado

//Ruta para cuando de envpia una petición get a la raíz
//Se muestra lo que está en index, carpeta views
//No se configura la ruta de la vista ni la extensión del archivo,
//esto ya se configuró en app.js (sección Settings)
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    //Renderiza el archivo ejs
    res.render('index', {
        tasks //Es igual a tasks: tasks. Se envía este objeto (tasks) a la vistas
    }) 
});

router.get('/add', (req, res) => {
    res.render('add')
    console.log('Enviado')
})

router.post('/add', async (req, res) => {
    //Tomo lo que viene del formulario (req.body) y creo un "objeto" de Task
    //Este tiene el esquema creado + el id que crea mongodb
    //async await es el método de JS para ejecutar de forma asíncrona
    const task = new Task(req.body);
    //Guardo los datos en la bd
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const {id} = req.params
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params
    const task = await Task.findById(id)
    res.render('edit', {
        task
    })
})

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params
    await Task.updateOne({_id: id}, req.body)
    res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
    //req.params recupera los datos enviados desde la vista
    const {id} = req.params //Guarda en id el _id de mongodb
    await Task.remove({_id: id}) //Borra el dato donde el _id sea igual al id
    res.redirect('/');
})

module.exports = router; //Exportando lo que guerdé en router