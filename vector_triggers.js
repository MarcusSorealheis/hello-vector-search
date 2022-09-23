/* function to vectorize data in the DB */

exports = async function(changeEvent) {
    var cors = require("cors"); /* Don't forget to add the cors dependency to your Atlas */
    const collection = context.services.get("Cluster0").db("sample_mflix").collection("movies");
    const docs = await collection.find({}).toArray();

    for (let i = 207; i < 2000; i++) {
      
        /* get the current document */
        const doc = docs[i];


        /* create a try/catch block to handle errors on requests */
        try {
            /* create a variable to hold the response from the API */
            const response = await context.http.get({ url: "https://scalethebrain.com/"+docs[i].title, headers: cors})
                .then(response => {
                    /* store and parse the EJSON response */
                    let ejson_body = EJSON.parse(response.body.text());
                    /* update the document with the new value of vectors */
                    let update = collection.updateOne({ _id: docs[i]._id }, { $set: { fullplot_vectors: ejson_body.vectors } });
                    /* return the response */
                    return ejson_body;
                })
            /* return the response */
            return response;
        } catch (err) {
            /* if there is an error, log it */
            console.log(err);
        }
    }
    return { message: "success" };
};
    
/* end of function to vectorize data added the DB */
