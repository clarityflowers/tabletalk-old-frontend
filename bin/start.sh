echo Initializing $NODE_ENV server
if [ "$NODE_ENV" = "production" ]
then
  webpack
  node server.js
else
  node server.js
fi
