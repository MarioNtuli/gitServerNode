

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
     origin:"http://localhost:3000"
}))
app.use(express.json())
app.use(express.urlencoded({extend: false}))

app.post("/api/addFavorite",async (req,res) =>{
     const commit = req.body
       
     const fs = require('fs');

     fs.writeFileSync('favorite.txt',JSON.stringify(commit),(err) => {
          if (err)
          JSON.stringify({err : err})
          
        }); 
     const contents = fs.readFileSync('favorite.txt', {encoding: 'base64'});
     
     res.end(JSON.stringify({content : contents})) 
     

})
app.post("/api/decodeFavorite",async (req,res) =>{
     const base64Data =  req.body
     const fs = require('fs');
     fs.writeFileSync("out.txt", base64Data.content, 'base64', function(err) {
          if(err){
               res.errored(JSON.stringify(err));  
          }
     });
     fs.readFile('out.txt', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          res.end(JSON.stringify({data:data,
               globalSha:base64Data.sha,
          }));
     });
     
})

app.listen(5000,() => {console.log("Server started on port 5000")})