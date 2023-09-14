import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/providers/image_provider.dart';
import 'package:provider/provider.dart';
import 'dart:io';

class AddPost extends StatefulWidget {
  const AddPost({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<AddPost> createState() => _AddPostState();
}

class _AddPostState extends State<AddPost> {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<ImageModel>(context, listen: true);
    final TextEditingController _captionController = TextEditingController();
    Future pickImage() async {
      try {
        final image =
            await ImagePicker().pickImage(source: ImageSource.gallery);
        if (image == null) return;
        provider.setImage(File(image.path));
      } on PlatformException catch (e) {
        print('Failed to pick image: $e');
      }
    }

    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Center(
            child: Text(widget.title),
          ),
          titleTextStyle: const TextStyle(
            color: Colors.black,
            fontSize: 24,
          ),
        ),
        body: SafeArea(
          child: Column(
            children: <Widget>[
              const SizedBox(height: 10),
              provider.image == null ? const Text('No image selected') : Image.file(provider.image!, width: 300, height: 300),
              ElevatedButton(
                  onPressed: () {
                    pickImage();
                  }, 
                  child: const Center(
                    child: Text('Add Image')
                  )
              ),
              const SizedBox(width: 10),
              TextFormField(
                controller: _captionController,
                minLines: 6,
                maxLines: null,
                decoration: const InputDecoration(
                  hintText: 'What\'s on your mind?',
                  border: InputBorder.none,
                ),
              ),
              const Divider(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Expanded(child: ElevatedButton(
                    child: const Center(
                      child: Text('Post')
                    ),
                    onPressed: () async {
                      try {
                        Response response = await post(Uri.parse('http://10.0.2.2:3002/post?limit=4'), headers: {
                          'Content-Type': 'application/json',
                        }, body: jsonEncode({
                          'caption': _captionController.text,
                          'image': provider.image.toString(),
                          'author': '64f2501a6de13ec984d41332'
                        }));

                        Fluttertoast.showToast(
                          msg: 'Post added!',
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          timeInSecForIosWeb: 1,
                          backgroundColor: Colors.grey,
                          textColor: Colors.white,
                          fontSize: 16.0
                        );

                        _captionController.clear();
                      }
                      catch(e) {
                        print(e);
                      }
                    },
                  )),
                ],
              ),
            ],
          ),
        ));
  }
}
