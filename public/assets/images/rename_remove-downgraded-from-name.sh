#!/bin/bash

# Loop over all JPEG images in the current directory
for file in *.jpg; do
  # Check if the current file is a regular file (not a directory, symlink, etc.)
  if [ -f "$file" ]; then
    # Remove the "-downgraded" suffix from the file name
    newfile=$(echo "$file" | sed 's/-downgraded//')
    # Rename the file
    mv "$file" "$newfile"
  fi
done
