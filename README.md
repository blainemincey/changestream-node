# changestream-node
Example of using the MongoDB Change Stream API using Node.js

1. Clone the repo
2. npm install
3. Make a copy of .env.example to .env.  Replace the appropriate variables
4. Open 2 terminals.
5. In first terminal, 'node stockTicker.js'
6. In second terminal, 'node myChangeStreamListener.js'

The Change Stream Listener will alert on stock prices greater than or equal to 100.
