echo Initializing $NODE_ENV server
if [ "$NODE_ENV" = "production" ]
then
  webpack
  nodejs server.js
else
  nodejs server.js
fi
