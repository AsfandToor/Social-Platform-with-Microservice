import 'package:flutter/material.dart';
import 'package:mobile/pages/home.dart';

void main () => runApp(const SocialApp());


class SocialApp extends StatelessWidget {
  const SocialApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Social App',
      theme: ThemeData(
        primaryColor: Colors.purple[900],
        useMaterial3: true
      ),
      home: const HomePage(title: 'Social App')
    );
  }
}