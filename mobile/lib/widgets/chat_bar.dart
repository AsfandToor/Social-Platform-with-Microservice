import 'package:flutter/material.dart';

class ChatBar extends StatelessWidget {
  final String title;
  final String subtitle;

  ChatBar({
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          title
        )
      ],
    );
  }
}