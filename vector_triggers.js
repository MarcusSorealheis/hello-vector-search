/* 
  Stubbed change event so you know the structure
  changeEvent = {
  _id: { _data: '62548f79e7f11292792497cc' },
  operationType: 'insert',
  clusterTime: { 
    "$timestamp": { 
      t: 1649712420,
      i:6 
    } 
  },
  ns: {
    db: 'sample_mflix',
    coll: 'movies'
  },
  documentKey: {
    plot: 'wtf',
    _id: { 
      "$oid": "599af247bb69cd89961c986d" 
    }
  },
  fullDocument: {
    _id: { 
      "$oid": "599af247bb69cd89961c986d" 
    },
    plot: 'wtf'
  }
}
End stubbed changeEvent to understand
*/
exports = async function (changeEvent) {
  // Check if the isNewPlot field was updated
  // const updatedFields = Object.keys(updateDescription.updatedFields);
  // const isNewPlot = updatedFields.some(field =>
  //   field.match(/plot/)
  // );

  /*
        A Database Trigger will always call a function with a changeEvent.
        Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/
    
        */

  let isNewPlot = async function () {
    if (changeEvent.operationType.type === "insert") {
      return true;
    } else {
      console.log("was not an insert");
    }
  };

  /* 
      if insert happens add the vector 
      TODO: Add some logic to support replace somewhere
    */
  if (isNewPlot) {
    const collection = context.services
      .get("Cluster0")
      .db("sample_mflix")
      .collection("movies");
    const docId = changeEvent.fullDocument._id;
    const field_to_vectorize = "plot";
    const vector_field_name = field_to_vectorize + "_vector";
    /* create a try/catch block to handle errors on requests */
    try {
      /* create a variable to hold the response from the API */

      const response = await context.http.post({
        url: "https://scalethebrain.com/rest_vector",
        body: {
          field_to_vectorize: changeEvent.fullDocument[field_to_vectorize],
        },
        encodeBodyAsJSON: true,
      });
      /* store and parse the EJSON response */
      let ejson_body = EJSON.parse(response.body.text());
      /* update the document with the new value of vectors */
      let update = collection.updateOne(
        { _id: docId },
        { $set: { vector_field_name: ejson_body.vector } }
      );

      /* return the response */
    } catch (err) {
      /* if there is an error, log it */
      console.log(err);
    }
  }
  return { message: "success" };
};

/* end of function to vectorize data added the DB */
