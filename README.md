# EduBlock Client

## Build

```sh
docker build --tag edublock-client:local .
```

## Run

```sh
docker run --name edublock-client --rm --publish 8080:80 edublock-client:local
```
