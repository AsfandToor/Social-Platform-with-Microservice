import 'package:flutter/material.dart';
import 'package:mobile/providers/fetch_post_provider.dart';

class PostWidget extends StatefulWidget {
  const PostWidget({Key? key, required this.post}) : super(key: key);

  final PostDetails post;

  @override
  State<PostWidget> createState() => _PostWidgetState();
}

class _PostWidgetState extends State<PostWidget> {
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
                color: Colors.black12, blurRadius: 2, offset: Offset(0, 2))
          ]),
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              const CircleAvatar(
                radius: 24,
                backgroundImage:
                    NetworkImage('https://picsum.photos/seed/picsum/200/300'),
              ),
              const SizedBox(width: 10),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      'John Doe',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      '2 hours ago',
                      style: TextStyle(color: Colors.black54),
                    )
                  ],
                ),
              ),
              IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.more_horiz))
            ],
          ),
          const SizedBox(height: 8),
          Text(
            widget.post.caption.toString(),
            style: const TextStyle(fontSize: 16),
            textAlign: TextAlign.start,
          ),
          const SizedBox(height: 8),
          Image.network(widget.post.images.isNotEmpty ? widget.post.images[0].url : 'https://picsum.photos/seed/picsum/200/300'),
          const SizedBox(height: 8),
          Row(
            children: <Widget>[
              IconButton(
                  onPressed: (){},
                  icon: const Icon(Icons.favorite_border)),
              IconButton(onPressed: () {}, icon: const Icon(Icons.comment)),
              IconButton(onPressed: () {}, icon: const Icon(Icons.share)),
            ],
          ),
          const Divider(),
          const Row(
            children: <Widget>[
              CircleAvatar(
                radius: 16,
                backgroundImage:
                    NetworkImage('https://picsum.photos/seed/picsum/200/300'),
              ),
              SizedBox(width: 8),
              Expanded(
                child: TextField(
                  decoration: InputDecoration(hintText: 'Write a comment...'),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
