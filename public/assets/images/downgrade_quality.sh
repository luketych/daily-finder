#!/bin/bash

# Loop over all JPEG images in the current directory
for file in *.jpg; do
  # Check if the current file is a regular file (not a directory, symlink, etc.)
  if [ -f "$file" ]; then
    # Downgrade the quality of the image to 80%
    convert "$file" -quality 80 "${file%.jpg}-downgraded.jpg"
  fi
done
