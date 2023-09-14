import 'package:chat_bubbles/chat_bubbles.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:mobile/widgets/chat_bar.dart';
import 'package:mobile/widgets/message_bubble.dart';

class ChatScreen extends StatefulWidget {
  ChatScreen({key}) : super(key: key);

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text("Chat Screen"),
            titleTextStyle: const TextStyle(
              color: Colors.black,
              fontSize: 24,
            )
        ),
        body: Column(
          children: [
            Expanded(
              child: StreamBuilder(
                stream: _firestore.collection('chats').orderBy('createdAt', descending: true).snapshots(),
                builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
                  if (snapshot.hasData) {
                    if(snapshot.data!.docs.isNotEmpty) {
                      List<QueryDocumentSnapshot> data = snapshot.data!.docs;
                      return ListView.builder(
                        itemCount: data.length,
                        padding: const EdgeInsets.all(8),
                        reverse: true,
                        itemBuilder: (context, index) => MessageBubble(
                          message: data[index].get('text').toString(),
                          isMine: data[index].get('userId') == _auth.currentUser!.uid,
                        ),
                      );
                    }
                    else {
                      return const Center(
                        child: Text('No Messages'),
                      );
                    }
                  } else {
                    return const Center(
                      child: CircularProgressIndicator(color: Colors.purple),
                    );
                  }           
                },
              ),
            ),
            MessageBar(
              onSend: (message) {
                _firestore.collection('chats').add({
                  'text': message,
                  'createdAt': Timestamp.now(),
                  'userId': _auth.currentUser!.uid
                });
              },
              actions: [
                InkWell(
                  child: const Icon(
                    Icons.add,
                    color: Colors.black,
                    size: 24,
                  ),
                  onTap: () {},
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 8, right: 8),
                  child: InkWell(
                    child: const Icon(
                      Icons.camera_alt,
                      color: Colors.green,
                      size: 24,
                    ),
                    onTap: () {},
                  ),
                ),
              ],
            )
          ],
        ),
      );
  }
}
