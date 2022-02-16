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

  console.log(lessonsData)

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


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})