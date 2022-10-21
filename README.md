# hello-vector-search

This project is meant to be an introduction to vector search and precedes a blog which walks through all the utliity files described below and is not intended for production deployments.

1. A simple JavaScript program to run from your computer to vectorize the `sample_mflix.movies` collection: [vectorize_collection.js](vectorize_collection.js).
2. A simple JavaScript program to run as a function in Atlas with an HTTPS Endpoint that will vectorize queries, unless you want to call a vector API directly: [vectorize_queries.js](vectorize_queries.js)
3. A simple JavaScript program to work as a database trigger in Atlas to ensure any new documents added to the collection get the vector treatment: [vector_triggers.js](vector_triggers.js)

### That's it. 

- I hope it's all super easy. We will release a blog soon, but in the meantime feel free to step through this almost an all Atlas workflow so you can prepare to talk about it. Very important. Most of our customers know JavaScript. Feel free to open a PR or any issues so we can iron them out before the rush comes. 

### Watch for Changes

If you want to take advantages or improvements, please watch the repo. It will change regularly.
![watch-repo](https://user-images.githubusercontent.com/2353608/194164132-ced7a315-6fd0-4927-b485-f11d6931fc87.gif)
