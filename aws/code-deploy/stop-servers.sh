#!/bin/bash

isAppExistent=`pgrep httpd`
if [[ -n  $isAppExistent ]]; then
   service httpd stop
fi

isAppExistent=`pgrep mysqld`
if [[ -n  $isAppExistent ]]; then
    service mysqld stop
fi
