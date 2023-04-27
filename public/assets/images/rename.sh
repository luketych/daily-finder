#!/bin/bash

i=20
for file in shutterstock_*.jpg; do
  if [ -f "$file" ]; then
    mv "$file" "image_$i.jpg"
    i=$((i+1))
  fi
done
