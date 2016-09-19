if [ "$NODE_ENV" = "production"]
then
  node server.js
else
  webpack-dev-server --content-base public/ --inline --colors --progress
fi
