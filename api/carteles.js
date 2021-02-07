const { v4: uuidv4 } = require('uuid');
const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context) {

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  let {data} = await octokit.repos.getContent({
    owner: 'sotoplatero',
    repo: 'db',
    path: 'cartelones.json',
  });

  let cartelones = Buffer.from(data.content, 'base64').toString('utf8') 

  return {
    headers: { 
        'Content-Type':'application/json' , 
    },    
    statusCode: 200,
    body: cartelones
  }     

}
