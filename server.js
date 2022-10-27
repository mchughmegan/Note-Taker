const express = require("express");
const apiroutes = require('./routes/apiroutes');
const htmlroutes = require('./routes/htmlroutes');

//app variable to set value of express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//middleware to serve static files from public
app.use(express.static('public'));
app.use('/api', apiroutes);
app.use('/',htmlroutes);

app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`));

