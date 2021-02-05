const { v4: uuidv4 } = require('uuid');
const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context) {

  let todo = JSON.parse( event.body )

  todo = {
    id: uuidv4(),
    done: false,
    ...todo,
  };

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  let {data} = await octokit.repos.getContent({
    owner: 'sotoplatero',
    repo: 'db',
    path: 'todos.json',
  });

  let todos = Buffer.from(data.content, 'base64').toString('utf8') 
  todos = [ ...JSON.parse(todos), todo ];

  var fileContent = Buffer.from( JSON.stringify( todos ), 'utf8' ).toString('base64') 

  await octokit.repos.createOrUpdateFileContents({
      owner: 'sotoplatero',
      repo: 'db',
      path: 'todos.json',
      message: '+',
      sha: data.sha,
      content: fileContent,
    })

  return {
    statusCode: 200,
    body: JSON.stringify(todos)
  }     

}
