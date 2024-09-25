#!/bin/bash

# Define variables
IMAGE_NAME="postgres:latest"
CONTAINER_NAME="postgres_db"
POSTGRES_USER="yourusername"
POSTGRES_PASSWORD="yourpassword"
POSTGRES_DB="yourdatabase"
PORT="5432"
VOLUME_NAME="postgres_data"

# Pull the PostgreSQL image
docker pull $IMAGE_NAME

# Create a Docker volume if it doesn't exist
docker volume create $VOLUME_NAME

# Run the PostgreSQL container
docker run -d \
  --name $CONTAINER_NAME \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -p $PORT:5432 \
  -v $VOLUME_NAME:/var/lib/postgresql/data \
  --restart always \
  $IMAGE_NAME

echo "PostgreSQL container is up and running. You can connect to it using:
postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$PORT/$POSTGRES_DB"
