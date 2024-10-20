#!/bin/bash

packages=("api-gateway" "broker" "frontend" "news" "market-data" "user")

cd packages || exit 1

for package in "${packages[@]}"; do
  echo "Installing dependencies in $package..."
  cd "$package" || exit 1  
  npm install              
  cd ..                      
done

echo "All packages have been installed."
