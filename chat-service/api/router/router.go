package router

import (
	"chat-service/api/controller"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	// Functionality
	// Chat
	router.HandleFunc("/api/chats", controller.GetAllChats).Methods("GET")
	router.HandleFunc("/api/chats/{id}", controller.GetChatById).Methods("GET")
	router.HandleFunc("/api/chats", controller.CreateChat).Methods("POST")
	router.HandleFunc("/api/chats/{id}", controller.UpdateChat).Methods("PUT")
	router.HandleFunc("/api/chats/{id}", controller.DeleteChat).Methods("DELETE")

	// Message
	router.HandleFunc("/api/messages/{id}", controller.GetMessageById).Methods("GET")
	router.HandleFunc("/api/messages", controller.CreateMessage).Methods("POST")
	router.HandleFunc("/api/messages/{id}", controller.UpdateMessage).Methods("PUT")
	router.HandleFunc("/api/messages/{id}", controller.DeleteMessage).Methods("DELETE")

	// Server Home
	router.HandleFunc("/", serveHome).Methods("GET")

	return router
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	http.ServeFile(w, r, "index.html")
}
