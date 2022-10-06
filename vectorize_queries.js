// This function is the endpoint's request handler.
// exports = async function({ query, headers, body}, response) {
  exports = async function ({ headers, body}, response) {
    const conn = context.services
      .get("mongodb-atlas")
      .db("sample_mflix")
      .collection("movies");
    var vectorAPIResponse = await context.http
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
  
    query_vector = vectorAPIResponse.vector;
    const searchAggregation = [
      {
        $search: {
          knnBeta: {
            path: "plot_vectors",
            vector: query_vector,
            k: 5
          },
        },
      }
    ];
    const searchResults = await conn.aggregate(searchAggregation).toArray();
  
    /* return the search results */
    return searchResults;
  };