require('dotenv').config()

const express = require('express')
const app = express()

const lessonsData = require("./someData")

// configuracion
app.set('view engine', 'hbs');
// cuando trabajamos con motores de plantillas, usamos .render()
// layout será la base para TODAS las vistas que busquemos
app.set("views", __dirname + "/views")

let hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

const DogApi = require('doggo-api-wrapper');
const myDog = new DogApi();

app.get('/', (req, res) => {
  // console.log(process.env.CLAVE_SECRETA)
  // res.send('Bonjour World! tu clave secreta es: ' + process.env.CLAVE_SECRETA)
  res.render("home.hbs")
})

app.get("/about", (req, res) => {
  let someObject = {
    name: "Patricio"
  }
  res.render("about.hbs", someObject)
})

// ahora usaremos data de otro modulo
app.get("/lessons", (req, res) => {
  res.render("lessons.hbs", {
    lessonsKeyName: lessonsData
  })
})

app.get("/approved-lessons", (req, res) => {
  const filteredData = lessonsData.filter((eachElem) => {
    return eachElem.approved === true
  })
  res.render("lessons.hbs", {
    lessonsKeyName: filteredData
  })
})

// params
app.get("/lessons-per-bootcamp/:bootcamp", (req, res) => {

  console.log(req.params) // parametros que se pasan por el URL

  const filteredLessons = lessonsData.filter((eachLesson) => {
    return eachLesson.bootcamp === req.params.bootcamp
  })

  res.render("lessons.hbs", {
    lessonsKeyName: filteredLessons
  })
})

// queries
app.get("/search", (req, res) => {

  console.log(req.query) // queries que se pasan por inputs => /?search=algo

  // find funciona como el filter pero solo retorna un elemento.
  const searchLesson = lessonsData.find((eachElem) => {
    return eachElem.topic === req.query.search
  })

  res.render("search.hbs", {
    searchLesson: searchLesson
  })
})


// Rutas de la API
app.get("/dog", (req, res) => {

  myDog.getARandomDog()
  .then((data) => {
    console.log(data) // SIEMPRE REVISAN COMO VIENE LA DATA DE LA API
    res.render("dogs/random-dog.hbs", { data } )
    // {
    //   data: data
    // }
    // ???
  })
  .catch((err) => {
    console.error(err)
  })

  // ??? data??
  // console.log(data)

})

app.get("/dog-by-breed/:breed", (req, res) => {

  myDog.getAllDogsByBreed(req.params.breed)
  .then(data => {
    console.log(data)
    res.render("dogs/dog-by-breed.hbs", { data })
  })
  .catch(err => console.error(err))

})

app.get("/breed", (req, res) => {

  myDog.getListOfAllBreeds()
  .then(data => {
    const breeds = Object.keys(data.message)
    console.log(breeds)
    res.render("dogs/breeds.hbs", { breeds })

  })
  .catch(err => console.error(err))


})





app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})