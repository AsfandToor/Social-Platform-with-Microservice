package model

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Message struct {
	ID      primitive.ObjectID  `json:"_id,omitempty" bson:"_id,omitempty"`
	Message string              `json:"message,omitempty"`
	Author  string              `json:"author,omitempty"`
	Time    primitive.Timestamp `json:"time,omitempty" bson:"time,omitempty"`
	Chat    primitive.ObjectID  `json:"chat,omitempty" bson:"chat,omitempty"`
}

func (m *Message) Validate() error {
	if m.Message == "" {
		return errors.New("message is required")
	}
	if m.Author == "" {
		return errors.New("author is required")
	}
	if m.Chat == primitive.NilObjectID {
		return errors.New("chat is required")
	}

	return nil
}
