const db = require('../database/models');
const {Op} = require('sequelize')

module.exports = {
    list : (req, res) => {
        db.Pelicula.findAll()
        .then(movies => {
            return res.render('moviesList', {
                movies
            })
        })
        .catch(error => console.log(error))
    },
    nueva : (req, res) => {
        db.Pelicula.findAll({
            order : [
                ['release_date','DESC']
            ],
            limit : 5
        })
        .then(movies => res.render('newestMovies',{
            movies
        }))
        .catch(error => console.log(error))
    },
    recommended : (req, res) => {
        db.Pelicula.findAll({
            where : {
                awards : {
                    [Op.gte] : 8
                }
            }
        })
        .then(movies => require.render('recomendedMovies',{
            movies
        }))
    },
    detail : (req, res) => {
        db.Pelicula.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail',{
                movie
            }))
            .catch(error => console.log(error))
    },
    add: function (req, res) {
        return res.render('moviesAdd')   
    },
    create: (req, res) => {
        const {title,rating,awards,releaase_date,lenght} = req.body;
        db.Pelicula.create({
            title : title.trim(),
            rating,
            awards,
            release_date,
            lenght
        }) 
        .then(movie => {
            console.log(movie)
            res.redirect('/movies/detail/' + movies.id)
        })
        .catch(error => console.log(error))
    },
    edit: (req, res) => {
        db.Pelicula.findByPk(req.params.id)
        .then(Movie => res.render('moviesEdit', {
            Movie
        }))
        .catch(error => console.log(error))
    },
    update: function (req,res) {
        db.Pelicula.update(
            {
                ...req.body
            },
            {
                where : {
                    id : req.paras.id
                }
            }
        )
        .then(() => {
            res.redirect('/movies/detail/' + req.params.id)
        })
        .catch(error => console.log(error))
    },
    remove: function (req, res) {
        db.Pelicula.findByPk(req.params.id)
        .then(Movie => res.render('moviesDelete', {
            Movie
        }))
        .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.Pelicula.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(() => res.redirect('/movies'))
        .catch(error => console.log(error))
    }
}