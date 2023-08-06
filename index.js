const express = require('express')
const app = express()
const port = 3000

const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
}));

app.set('view engine', 'handlebars')



app.use(express.static('public'))

//create Middlware

app.use((req, res, next) => {
    const dateNow = new Date("2023-08-11T13:59:00Z")
    console.log(dateNow);
    const day = dateNow.getDay()
    const hours = dateNow.getHours()
    console.log(day);
    console.log(hours);
    if (day > 0 && day < 6 && hours >= 10 && hours <= 17) {
        next()
    }
    else {
        res.send('<h1>The application is only available during working hours.<h1>');
    }
})

app.get('/', (req, res) => {
    res.render('home', { layout: 'index' })
})
app.get('/services', (req, res) => {
    res.render('services', { layout: 'index' })
})
app.get('/contact', (req, res) => {
    res.render('contact', { layout: 'index' })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})