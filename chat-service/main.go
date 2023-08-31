package main

import (
	"chat-service/api/router"
	_ "chat-service/db"
	"flag"
	"log"
	"net/http"
)

func main() {
	listenAddress := flag.String("listen-address", ":3000", "The address to listen on for HTTP requests.")
	println("Starting server on port", *listenAddress)
	log.Fatal(http.ListenAndServe((*listenAddress), router.Router()))
}
