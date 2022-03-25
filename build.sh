docker build -t movies .
docker run --env-file ./config/.env -d -p 8080:8080 movies