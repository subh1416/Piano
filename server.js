// const express = require('express');
// const app = express()

// app.set('view engine','ejs')
// app.use(express.static('public'))

// app.get('/',(req, res) => {
//     res.render('piano')

// })

// app.listen(3500)

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Song = require('./models/song.js')
const port = 3000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/subhPiano", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(err)=>{
  if(err) console.log(`unable to connect: ${err}`);
  else
   console.log("connected")
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("piano");
});

app.post("/songs", async (req, res) => {
  const song = new Song({
    notes: req.body.songNotes
  })

  await song.save()

  res.json(song)
 
});

app.get('/songs/:id', async (req, res)=>{
  let song
  try{
   song = await Song.findById(req.params.id)
  }catch(e){
    song = undefined

  }
  res.render('piano',{song:song})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

