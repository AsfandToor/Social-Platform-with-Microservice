package controller

import (
	"chat-service/db"
	"chat-service/model"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllChats(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL)
	w.Header().Set("Content-Type", "application/json")

	collection := db.GetCollection("social", "chat")

	cursor, err := collection.Find(r.Context(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	var chats []bson.M

	for cursor.Next(context.Background()) {
		var chat bson.M
		if err = cursor.Decode(&chat); err != nil {
			log.Fatal(err)
		}
		chats = append(chats, chat)
	}
	defer cursor.Close(context.Background())

	json.NewEncoder(w).Encode(chats)
}

func GetChatById(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL)
	w.Header().Set("Content-Type", "application/json")

	collection := db.GetCollection("social", "chat")

	params := mux.Vars(r)

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		log.Fatal(err)
	}

	filter := bson.M{"_id": objectId}

	var chat bson.M

	if err := collection.FindOne(r.Context(), filter).Decode(&chat); err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode("Invalid Data")
		return
	}

	json.NewEncoder(w).Encode(chat)
}

func CreateChat(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL)
	w.Header().Set("Content-Type", "application/json")

	collection := db.GetCollection("social", "chat")

	var chat model.Chat

	if err := json.NewDecoder(r.Body).Decode(&chat); err != nil {
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	if err := chat.Validate(); err != nil {
		json.NewEncoder(w).Encode("Validation Error")
		return
	}

	_, err := collection.InsertOne(r.Context(), chat)

	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(true)
}

func UpdateChat(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL)
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		log.Fatal(err)
	}

	filter := bson.M{"_id": objectId}

	collection := db.GetCollection("social", "chat")

	var chat model.Chat

	if err := json.NewDecoder(r.Body).Decode(&chat); err != nil {
		json.NewEncoder(w).Encode("Invalid request body")
		return
	}

	if err := chat.Validate(); err != nil {
		json.NewEncoder(w).Encode("Validation Error")
		return
	}

	update := bson.M{
		"$set": bson.M{
			"name": chat.Name,
		},
	}

	_, err = collection.UpdateOne(r.Context(), filter, update)

	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(true)
}

func DeleteChat(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL)
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		log.Fatal(err)
	}

	filter := bson.M{"_id": objectId}

	chatCollection := db.GetCollection("social", "chat")
	msgCollection := db.GetCollection("social", "message")

	var chat bson.M

	result := chatCollection.FindOne(r.Context(), filter)

	if err := result.Decode(&chat); err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode("Invalid Data")
		return
	}

	messageIds := chat["messages"].(primitive.A)

	for _, id := range messageIds {
		if err != nil {
			log.Fatal(err)
		}
		msgCollection.DeleteOne(r.Context(), bson.M{"_id": id})
	}

	_, err = chatCollection.DeleteOne(r.Context(), filter)

	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(true)
}
