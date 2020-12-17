const express = require('express');
const Parser = require('rss-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;


let app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/rssfeeds', (req, res) => {
  
    const FEED_LIST = req.body.feeds;
    //res.json(req.body);
    
    let parser = new Parser();

    const feedRequests = FEED_LIST.map(feed => {
      return parser.parseURL(feed);
    })

    Promise.all(feedRequests).then(response => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Origin', 'some-domain-to-allow.com');
      res.header('Access-Control-Allow-Methods', 'POST');
      res.json(response);
    })
    
  })
  
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
