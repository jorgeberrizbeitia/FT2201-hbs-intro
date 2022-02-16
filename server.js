require('dotenv').config()

const express = require('express')
const app = express()

const lessonsData = require("./someData")


// configuracion
app.set('view engine', 'hbs');
// cuando trabajamos con motores de plantillas, usamos .render()
// layout será la base para TODAS las vistas que busquemos
app.set("views", __dirname + "/views")

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

  console.log(req.params.bootcamp)

  const filteredLessons = lessonsData.filter((eachLesson) => {
    return eachLesson.bootcamp === req.params.bootcamp
  })

  res.render("lessons.hbs", {
    lessonsKeyName: filteredLessons
  })

})

// queries
app.get("/search", (req, res) => {

  console.log(req.query)

  const searchLesson = lessonsData.find((eachElem) => {
    return eachElem.topic === req.query.search
  })

  res.render("search.hbs", {
    searchLesson: searchLesson
  })

})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})