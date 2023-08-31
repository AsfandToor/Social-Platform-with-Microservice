package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	connectionStr = "mongodb+srv://user:user@cluster0.toxw990.mongodb.net/socials"
	client        *mongo.Client
)

// Connect initializes the MongoDB connection.
func Connect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(connectionStr))
	if err != nil {
		return err
	}

	return nil
}

func Disconnect() {
	if client != nil {
		err := client.Disconnect(context.Background())
		if err != nil {
			log.Println("Error disconnecting from MongoDB:", err)
		}
	}
}

func GetClient() *mongo.Client {
	return client
}

func GetDatabase(databaseName string) *mongo.Database {
	return client.Database(databaseName)
}

func GetCollection(databaseName string, collectionName string) *mongo.Collection {
	return client.Database(databaseName).Collection(collectionName)
}

func init() {
	println("Connecting to MongoDB...")
	if err := Connect(); err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	println("Connected to MongoDB!")
}
