import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class ImageModel with ChangeNotifier {
  File? _image;
  File? get image => _image;

  void setImage(File image) {
    _image = image;
    notifyListeners();
  }
} 