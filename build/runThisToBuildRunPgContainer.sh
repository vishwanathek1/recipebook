#!/bin/bash
docker build -t example.com/siddhi_postgres:v1 .
docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=admin -d example.com/siddhi_postgres:v1
sleep 10s
docker exec -d postgres /tmp/setupPg.sh