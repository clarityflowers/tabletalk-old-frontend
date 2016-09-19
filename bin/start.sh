echo Initializing $NODE_ENV server
if [ "$NODE_ENV" = "production" ]
then
  webpack
  node server.js
else
  webpack-dev-server --content-base public/ --inline --colors --progress
fi
