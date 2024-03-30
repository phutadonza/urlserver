const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const shortid = require('shortid');
const db = 'mongodb+srv://root:1234@url.bxubhmg.mongodb.net/urlshort'
const frontn = 'https://server-phutadon.azurewebsites.net/'

mongoose.connect(process.env.MONGODB_URL||db)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

let urlSchema = new mongoose.Schema({
  Full_link_url: String,
  Short_url: String,
  count: { type: Number, default: 0 }
});

let Data = mongoose.model('Data', urlSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
  res.send("Hello World")
})

app.post('/api/url/create', (req, res) => {
  let fullurl = req.body.url;
  let shortID = shortid.generate();
  
  let data ={
    Full_link_url: fullurl,
    Short_url: shortID
  };
  
  Data.create(data)
    .then(result => {
      let shorturl = frontn + `/${result.Short_url}`;
      res.json({ shorturl });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(false);
    });

  Data.updateOne({ Short_url: shortID }, { $inc: { count: 0 } })
    .then(result => console.log("Count updated"))
    .catch(err => console.error("Error updating count:", err));
});

app.post('/api/url/delete', (req, res) => {
  let _id = req.body._id;

  Data.findOneAndDelete({ _id })
    .then(() => {
      res.status(200).send("URL deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error Delete");
    });
});

app.get('/:shorturl', (req, res) => {
  const shorturl = req.params.shorturl
  
  Data.findOneAndUpdate({ Short_url: shorturl }, { $inc: { count: 1 } }, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send('URL not found');
      }
      const fullurl = result.Full_link_url;
      res.redirect(fullurl);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error shorturl or count');
    });
});

app.get('/api/url/data', (req, res) => {
  Data.find()
    .then(data => {
      //console.log(data)
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error data');
    });
});
const port = process.env.PORT||5000
app.listen(port, () => {
  console.log('Server started successfully');
});