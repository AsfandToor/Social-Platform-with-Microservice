import 'package:flutter/material.dart';
import 'package:mobile/widgets/post.dart';

class HomePage extends StatefulWidget {
  const HomePage({ super.key, required this.title });

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text(widget.title),
        ),
        titleTextStyle: const TextStyle(
          color: Colors.black,
          fontSize: 24,
        )
      ),
      body: ListView.builder(
          padding: const EdgeInsets.all(8),
          itemBuilder: (context, index) => PostWidget(),
        )
    );
  }
}