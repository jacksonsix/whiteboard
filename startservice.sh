#!/bin/bash

node chatserver/chatserver.js &
node httpserver.js &
node fileserver/fileserver.js &
echo '$'

