#!/bin/sh
# Run database push first, then start the server
echo "Pushing Prisma schema to database..."
npx prisma db push --accept-data-loss
echo "Starting server..."
node src/server.js
