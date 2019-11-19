#!/usr/bin/bash

g++ -fpreprocessed -dD -E test.cpp | sed '/^$/d' | tail -n+2