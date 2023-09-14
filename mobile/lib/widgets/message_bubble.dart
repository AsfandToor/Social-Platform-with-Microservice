import 'package:flutter/material.dart';
import 'package:chat_bubbles/chat_bubbles.dart';

class MessageBubble extends StatelessWidget {
  final String message;
  final bool isMine; 

  MessageBubble({
    super.key, 
    required this.message,
    required this.isMine 
  }); 

  @override
  Widget build(BuildContext context) {
    return BubbleSpecialThree(
      text: message,
      color: isMine ? Color(0xFF1B97F3) : Color(0xFFE8E8EE),
      tail: true,
      textStyle: TextStyle(
        color: isMine ? Colors.white : Colors.black,
        fontSize: 16
      ),
      isSender: isMine,
    );
  }
}