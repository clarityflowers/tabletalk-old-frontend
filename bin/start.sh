echo Initializing $NODE_ENV server
if [ "$NODE_ENV" = "production" ]
then
  webpack
else
  node server.js
  # webpack-dev-server --content-base public/ --inline --colors
fi
