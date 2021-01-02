const Parser = require('rss-parser');
let parser = new Parser();

module.exports = async function (context, req) {
    
    context.log('JavaScript HTTP trigger function processed a request.');

    if(req.body.feeds){
        context.log('Feeds found!');
        const FEED_LIST = req.body.feeds;
        try{
            const feedRequests = FEED_LIST.map(feed => {
                return parser.parseURL(feed);
            });
           context.log('parsing in progress');
            let response  = await Promise.all(feedRequests);
            context.log(response);
            context.res = {
                body: response
            };
        }catch(error){
            context.res = {
                body: error
            };
        }
    }
    else{
        context.log('no feeds found');
        context.res = {
            body: 'Request Success but no feeds found'
        };
    }

    //context.done();

    
}
