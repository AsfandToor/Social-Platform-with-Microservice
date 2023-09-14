import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'dart:convert';

class ImageDetails {
  ImageDetails(this.url, this.public_id);

  String url;
  String public_id;

  ImageDetails.fromJson(Map<String, dynamic> json) :
    url= json['url'],
    public_id= json['public_id'];
}

class PostDetails {
  String _id;
  String caption;
  String author;
  List<ImageDetails> images;

  PostDetails(this._id, this.caption, this.author, this.images);

  PostDetails.fromJson(Map<String, dynamic> json) :
    _id= json['_id'],
    caption= json['caption'],
    author= json['author'],
    images = json['images'] == null ? [] : List<ImageDetails>.from(json['images'].map((image) => ImageDetails.fromJson(image)));
}

class PaginatedPosts {
  late List<PostDetails> docs;
  late int totalDocs;
  late int limit;
  late int totalPages;
  late int page;
  late int pagingCounter;
  late bool hasPrevPage;
  late bool hasNextPage;

  PaginatedPosts(this.docs, this.totalDocs, this.limit, this.totalPages, this.page, this.pagingCounter, this.hasPrevPage, this.hasNextPage);

  PaginatedPosts.fromJson(Map<String, dynamic> json) {
    docs = json['docs'] == null ? [] : List<PostDetails>.from(json['docs'].map((post) => PostDetails.fromJson(post)));
    totalDocs= json['totalDocs'];
    limit= json['limit'];
    totalPages= json['totalPages'];
    page= json['page'];
    pagingCounter= json['pagingCounter'];
    hasPrevPage= json['hasPrevPage'];
    hasNextPage= json['hasNextPage'];
  }
}

class FetchPostModel with ChangeNotifier {
  PaginatedPosts _posts = PaginatedPosts([], 0, 0, 0, 0, 0, false, false);
  PaginatedPosts get posts => _posts;

  void getPosts() async {
    try {
      Response response = await get(Uri.parse('http://10.0.2.2:3002/post?limit=4'), headers: {
        'Content-Type': 'application/json',
      });

      if (response.statusCode == 200) {
        PaginatedPosts allPosts = PaginatedPosts.fromJson(jsonDecode(response.body));
        _posts = allPosts;
      }
    }
    catch(e) {
      print(e);
    }
    notifyListeners();
  }

  void fetchMore(page) async {
    try {
      final String str = page.toString();
      Response response = await get(Uri.parse('http://10.0.2.2:3002/post?page=$str&limit=4'), headers: {
        'Content-Type': 'application/json',
      });

      if (response.statusCode == 200) {
        PaginatedPosts allPosts = PaginatedPosts.fromJson(jsonDecode(response.body));
        _posts.docs.addAll(allPosts.docs);
        _posts.totalDocs = allPosts.totalDocs;
        _posts.limit = allPosts.limit;
        _posts.totalPages = allPosts.totalPages;
        _posts.page = allPosts.page;
        _posts.pagingCounter = allPosts.pagingCounter;
        _posts.hasPrevPage = allPosts.hasPrevPage;
        _posts.hasNextPage = allPosts.hasNextPage;
      }
    }
    catch(e) {
      print(e);
    }
    notifyListeners();
  }
}