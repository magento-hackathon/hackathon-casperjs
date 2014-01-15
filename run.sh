#!/bin/bash

cd "$(dirname "$0")"
dir="$(pwd)"

# Usage
if [ $# -lt 2 ]; then
    cat <<EOF
    Usage $0 <output-file> <unsecure-url> [<secure_url>]
EOF
    exit 1
fi

output_file=$1
unsecure_url=$2
secure_url=$3

options=''

if [ "$secure_url" != "" ]; then
    options="$options --secure_url=\"$secure_url\""
fi

options="$options --xunit=$dir/$output_file"

# ignore ssl errors (self signed certificates... we are developers ;) )
options="$options --ignore-ssl-errors=yes"

cat <<EOF
casperjs --pre=config.js test $dir/tests/ --url="$unsecure_url" $options
EOF
