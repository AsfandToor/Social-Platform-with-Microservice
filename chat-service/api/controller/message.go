package controller

import (
	"chat-service/db"
	"chat-service/model"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetMessageById(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	collection := db.GetCollection("social", "message")

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		log.Fatal(err)
	}

	filter := bson.M{"_id": objectId}

	var message bson.M

	if err := collection.FindOne(r.Context(), filter).Decode(&message); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(message)
}

func CreateMessage(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	w.Header().Set("Content-Type", "application/json")

	chatCollection := db.GetCollection("social", "chat")
	msgCollection := db.GetCollection("social", "message")

	var message model.Message

	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		panic(err)
	}

	if err := message.Validate(); err != nil {
		panic(err)
	}

	message.Time = primitive.Timestamp{T: uint32(time.Now().Unix()), I: 0}

	result, err := msgCollection.InsertOne(r.Context(), message)

	if err != nil {
		panic(err)
	}

	chatId := message.Chat

	chatResult := chatCollection.FindOneAndUpdate(r.Context(), bson.M{"_id": chatId}, bson.M{"$push": bson.M{"messages": result.InsertedID}})

	if err := chatResult.Err(); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(true)
}

func UpdateMessage(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		panic(err)
	}

	filter := bson.M{"_id": objectId}

	collection := db.GetCollection("social", "message")

	var message model.Message

	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		panic(err)
	}

	collection.FindOneAndUpdate(r.Context(), filter, bson.M{"$set": message})

	json.NewEncoder(w).Encode(true)
}

func DeleteMessage(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	objectId, err := primitive.ObjectIDFromHex(params["id"])

	if err != nil {
		panic(err)
	}

	filter := bson.M{"_id": objectId}

	msgCollection := db.GetCollection("social", "message")
	chatCollection := db.GetCollection("social", "chat")

	result := msgCollection.FindOne(r.Context(), filter)

	var message model.Message

	if err := result.Decode(&message); err != nil {
		panic(err)
	}

	chatId := message.Chat

	chatResult := chatCollection.FindOneAndUpdate(r.Context(), bson.M{"_id": chatId}, bson.M{"$pull": bson.M{"messages": objectId}})

	if err := chatResult.Err(); err != nil {
		panic(err)
	}

	msgCollection.DeleteOne(r.Context(), filter)

	json.NewEncoder(w).Encode(true)
}
