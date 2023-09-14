import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:mobile/screens/home.dart';
import 'package:mobile/screens/loading_screen.dart';
import 'package:mobile/screens/login_screen.dart';

enum AuthState { PENDING, AUTHENTICATED, UNAUTHENTICATED }

class Auth {
  static final FirebaseAuth _auth = FirebaseAuth.instance;
  static Stream<AuthState> authState$ = FirebaseAuth.instance.authStateChanges().map((user) {
    if (user == null) {
      return AuthState.UNAUTHENTICATED;
    } else {
      return AuthState.AUTHENTICATED;
    }
  });

}

StreamBuilder authGuard = StreamBuilder(
  stream: Auth.authState$,
  builder: (context, snapshot) {
    switch (snapshot.data) {
      case AuthState.PENDING:
        return const LoadingScreen();
      case AuthState.AUTHENTICATED:
        return const HomePage(title: 'Social App');
      case AuthState.UNAUTHENTICATED:
        return const LoginScreen();
      default:
        return const LoadingScreen();
    }
  }
);