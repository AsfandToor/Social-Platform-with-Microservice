import 'package:flutter/material.dart';

class PostWidget extends StatefulWidget {
  const PostWidget({ Key? key }) : super(key: key);

  @override
  State<PostWidget> createState() => _PostWidgetState();
}

class _PostWidgetState extends State<PostWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(8),
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 2,
            offset: Offset(0, 2)
          )
        ]
      ),
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              const CircleAvatar(
                radius: 24,
                backgroundImage: NetworkImage('https://picsum.photos/seed/picsum/200/300'),
              ),
              const SizedBox(width: 10),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                     Text(
                      'John Doe',
                      style: TextStyle(
                        fontWeight: FontWeight.bold
                      ),
                    ),
                     Text(
                      '2 hours ago',
                      style: TextStyle(
                        color: Colors.black54
                      ),
                    )
                  ],
                ),
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.more_horiz)
              )
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum aliquet, nisl velit aliquet magna, quis aliquam nisl nisl eu nisl. Donec euismod, nisl eget fermentum aliquet, nisl velit aliquet magna, quis aliquam nisl nisl eu nisl.',
            style: TextStyle(
              fontSize: 16
            ),
          ),
          const SizedBox(height: 8),
          Image.network('https://picsum.photos/seed/picsum/200/300'),
          const SizedBox(height: 8),
          Row(
            children: <Widget>[
              IconButton(
                onPressed: _incrementCounter,
                icon: const Icon(Icons.favorite_border)
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.comment)
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.share)
              ),
            ],
          ),
          const Divider(),
          const Row(
            children: <Widget>[
              CircleAvatar(
                radius: 16,
                backgroundImage: NetworkImage('https://picsum.photos/seed/picsum/200/300'),
              ),
              SizedBox(width: 8),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Write a comment...'
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}