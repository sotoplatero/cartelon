const { v4: uuidv4 } = require('uuid');
const { Octokit } = require("@octokit/rest");

module.exports = async function(cartel) {

  // let todo = JSON.parse( event.body )

  cartel = {
    id: uuidv4(),
    created_at: new Date,
    ...cartel,
  };

  console.log(process.env.GITHUB_TOKEN)
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  let {data} = await octokit.repos.getContent({
    owner: 'sotoplatero',
    repo: 'db',
    path: 'cartelones.json',
  });

  let cartelones = Buffer.from(data.content, 'base64').toString('utf8') 
  cartelones = [ ...JSON.parse(cartelones), cartel ];

  var fileContent = Buffer.from( JSON.stringify( cartelones ), 'utf8' ).toString('base64') 

  let response = await octokit.repos.createOrUpdateFileContents({
      owner: 'sotoplatero',
      repo: 'db',
      path: 'cartelones.json',
      message: '+',
      sha: data.sha,
      content: fileContent,
    })

  // console.log(response)

}
