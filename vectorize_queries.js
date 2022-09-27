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
exports = async function (query = "all") {
  const encodedText = encodeURIComponent(query);
  const conn = context.services
    .get("mongodb-atlas")
    .db("sample_mflix")
    .collection("movies");
  var response = await context.http
    .post({
      url: "https://scalethebrain.com/rest_vector",
      body: {
        field_to_vectorize: body,
      },
      encodeBodyAsJSON: true,
    })
    .then((response) => {
      const ejson_body = EJSON.parse(response.body.text());
      return ejson_body;
    })
    .catch((err) => {
      console.log(err);
    });

  /* store query vector and build the aggregation */
  query_vector = response.vector;
  const searchAggregation = [
    {
      $search: {
        knn: {
          path: "plot_vector",
          query: query_vector,
          k: 5,
        },
      },
    },
  ];
  const searchResults = await conn.aggreregate(searchAggregation).toArray();

  /* return the search results */
  return searchResults;
};
