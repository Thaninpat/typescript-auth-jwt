import { config } from 'dotenv';
config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import createServer from './createServer';

const { PORT, DB_USER, DB_PASSWORD, DB_NAME, FRONTEND_URI } = process.env;

const startServer = async () => {
  try {
    // Connect to the database
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ghzsn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log('Data connected');

    const app = express();
    app.use(cookieParser());

    const server = await createServer();

    server.applyMiddleware({
      app,
      cors: { origin: FRONTEND_URI, credentials: true },
    });

    app.listen({ port: PORT }, () =>
      console.log(
        `Server is ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
