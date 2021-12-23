const express = require('express');
const router = express.Router();
const {list,nueva,recommended,detail,add,create,edit,update,destroy,remove} = require('../controllers/moviesController');

router
    .get('/', list)
    .get('/new', nueva)
    .get('/recommended', recommended)
    .get('/detail/:id', detail)

    .get('/add', add)
    .post('/create', create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .get('/remove/:id', remove)
    .delete('/delete/:id', destroy)



module.exports = router;