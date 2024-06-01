# hello-vector-search

— Note in 2024 for archiving: I previously wrote a tutorial in 2022 that was embargoed by a Product Marketing Manager that was a introduction to vector search using MongoDB. Here lived the referenced code examples. Unfortunately, there were no good solutions for vectorization at scale, so I built one. The unerlying infra struggled with the nature of the workload so I left my full-time role at MongoDB and started an infra company. I hope this provides you ideas on how you can wholly manage a vector workload on teh Atlas platform. I've moved on from this wave to a new one, but if you stumbled upon it ask any questions you might have. —

This project is meant to be an introduction to vector search using mongodb and precedes a blog which walks through all the utliity files described below and is not intended for production deployments.

1. A simple JavaScript program to run from your computer to vectorize the `sample_mflix.movies` collection: [vectorize_collection.js](vectorize_collection.js).
2. A simple JavaScript program to run as a function in Atlas with an HTTPS Endpoint that will vectorize queries, unless you want to call a vector API directly: [vectorize_queries.js](vectorize_queries.js)
3. A simple JavaScript program to work as a database trigger in Atlas to ensure any new documents added to the collection get the vector treatment: [vector_triggers.js](vector_triggers.js)

### That's it. 

- I hope it's all super easy. We will release a blog soon, but in the meantime feel free to step through this almost an all Atlas workflow so you can prepare to talk about it. Very important. Most of our customers know JavaScript. Feel free to open a PR or any issues so we can iron them out before the rush comes. 

