#!/bin/sh

# Add secrets into .env file
touch .env
if [ -d /run/secrets/ ]; then
  for filename in /run/secrets/*; do
    echo "$(basename "$filename")=$(cat "$filename")" >> .env
  done
fi

exec "$@"