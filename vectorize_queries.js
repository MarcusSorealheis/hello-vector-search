/* 
  function to vectorize queries 

  This function needs to created in Atlas. 
  To get started, create a new App Service and select 
  "Functions" from the left-hand menu. Click 
  "Add Function" and choose "Incoming Webhook".
  Name your function and select a language. 
  For our purposes, we'll use Node.js.
  Copy and paste the code below into the code editor.

*/

exports = async function(query = "all") {
    var cors = require("cors");
    const encodedText = encodeURIComponent(query);
    var response = await context.http.get({ url: "https://scalethebrain.com/"+encodedText, headers: cors})
      .then(response => {
        const ejson_body = EJSON.parse(response.body.text());
        return ejson_body;
      })
    return response.vectors;
};