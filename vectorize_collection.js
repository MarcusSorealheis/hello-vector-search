/* 
  a function to initially vectorize data in the DB 
  in the sample_mflix.movies namespace. You can run
  this from your workstation or a VM with network
  access to your Atlas cluster.  I forgot a lot of 
  what I learned from Crockford back in the day,
*/
const { MongoClient, ServerApiVersion } = require("mongodb");
const axios = require('axios');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });


/* function to vectorize data in the sample_mflix.users namespace */

const username = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
/*  
  define a function to iterate though an entire collection 
  and make updates to existing documents based on the returned 
  value of an API.
*/
async function iterate_and_update(targetCollection,field) {
  try {
    const docs = targetCollection.find();
    /* iterate through all the documents in the collection */
      for await (const doc of docs) { 
        console.log(doc);
      await axios.post("https://scalethebrain.com/rest_vector", {"field_to_vectorize": doc[field]})
          .then((response) => {
            const vectors_returned = response.data.vector;
            /* update the document with the new value of vectors and
             return the update to the collection */
            return targetCollection.updateOne(
              { _id: doc._id },
              { $set: {title_vectors: vectors_returned } }
            )
          }
          )
        }
    } catch(err) {
      console.log(err);
    }
  }
  
/* name the function to vectorize an entire collection and export it  to be called from the command line */
module.exports.vectorize_collection = async function (field = "title") {
  const uri = `mongodb+srv://${username}:${password}@cluster0.xh91t.mongodb.net/admin?retryWrites=true&w=majority`;

  /* Create a new MongoClient */
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
   /* connect to the cluster and collection */ 
  await client.connect();
  /* test connection */
  client.db("admin").command({ ping: 1 });
  setTimeout(function(){
    console.log("Server says: \"Ack!\"");
  }, 3000);
  
  const collection = client.db("sample_mflix").collection("movies");

  /* invoke the function to iterate through the collection and update the documents */
  iterate_and_update(collection, field);
  
  /* close the connection to the cluster */
  return { message: "success" };
  client.close();
}; 

/* end of function to vectorize data in the sample_mflix.users namespace */
