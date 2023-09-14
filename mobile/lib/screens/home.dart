import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:mobile/providers/fetch_post_provider.dart';
import 'package:mobile/screens/add_post.dart';
import 'package:mobile/screens/chat-screen.dart';
import 'package:mobile/widgets/post.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    final provider = Provider.of<FetchPostModel>(context, listen: false);
    provider.getPosts();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<FetchPostModel>(context, listen: true);
    final ScrollController scrollContainer = ScrollController();

    scrollContainer.addListener(() {
      if (scrollContainer.position.maxScrollExtent ==
          scrollContainer.position.pixels) {


        provider.posts.page == provider.posts.totalPages
            ? null
            : provider.fetchMore(provider.posts.page + 1);
      }
    });

    return Scaffold(
        appBar: AppBar(
          title: Center(
            child: Text(widget.title),
          ),
          titleTextStyle: const TextStyle(
            color: Colors.black,
            fontSize: 24,
          ),
          actions: <Widget>[
            PopupMenuButton<int>(
                onSelected: (value) async {
                  switch (value) {
                    case 0:
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const AddPost(
                                    title: 'Create Post',
                              )
                          )
                      );
                      break;
                    case 1:
                      await FirebaseAuth.instance.signOut();
                      break;
                    case 2:
                      Navigator.push(context, MaterialPageRoute(builder: (context) => ChatScreen()));
                      break;
                    default:
                      break;
                  }
                },
                itemBuilder: (context) => [
                      const PopupMenuItem(
                        value: 0,
                        child: Text('Create Post'),
                      ),
                      const PopupMenuItem(
                        value: 2,
                        child: Text('Chat'),
                      ),
                      const PopupMenuDivider(),
                      const PopupMenuItem(
                        value: 1,
                        child: Text('Logout'),
                      )
                    ])
          ],
        ),
        body: ListView.builder(
          controller: scrollContainer,
          padding: const EdgeInsets.all(8),
          itemCount: provider.posts.docs.length,
          itemBuilder: (BuildContext context, int index) {
            return PostWidget(
              post: provider.posts.docs[index],
            );
          },
        ));
  }
}
