package model

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Chat struct {
	ID       primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string               `json:"name,omitempty"`
	Users    []string             `json:"users,omitempty"`
	Messages []primitive.ObjectID `json:"messages,omitempty" bson:"messages,omitempty"`
}

func (c *Chat) Validate() error {
	if c.Name == "" {
		return errors.New("Chat name is required!")
	}
	return nil
}

func (c *Chat) IsMongoID() error {
	if c.ID.Hex() == "" {
		return errors.New("Invalid ID!")
	}
	return nil
}
