const express = require('express'); // this line imports the expres library 
const app = express();  
const axios = require('axios');
const path = require('path');

let port = 3000;

app.use(express.static('public'));
let staticPath = path.join(__dirname, 'public');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{          // this is where the user entered the url - forward slash means homepage
    res.sendFile('index.html');     // sesrver response
});

app.post('/queryGit', async (req, res)=>{     // post method sends information to the server
    //console.log(req.body);
    try {
        const response = await axios.get(`https://api.github.com/users/${req.body.username}`);
        console.log(response.data);
        if(response.data.public_repos <= 5){
            res.sendFile(staticPath + '/amatuer.html');
        } else if (response.data.public_repos > 5 && response.data.public_repos <= 10){
            res.sendFile(staticPath + '/gettingthere.html');
        } else if(response.data.public_repos > 10 && response.data.public_repos <= 20) {
            res.sendFile(staticPath + '/pro.html');
        } else {
            res.sendFile(staticPath + '/godtier.html');
        }
       // res.json(response.data.login);
    }
    catch (err) {
        console.log(err)
    }
});
// server will only listen if dependencies are there - node modules are not saved on github due to file size - npm init or npm start and npm install to reinstall node files
app.listen(port, ()=> console.log(`Server listening on Port: ${port}`)); // before proper setting up, this only works if I type npm start or node server.js was entered in the terminal