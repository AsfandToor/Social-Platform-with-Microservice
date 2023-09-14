import 'package:flutter/material.dart';
import 'package:mobile/guards/auth_guard.dart';
import 'package:mobile/providers/fetch_post_provider.dart';
import 'package:mobile/screens/loading_screen.dart';
import 'package:mobile/screens/login_screen.dart';
import 'package:mobile/screens/signup_screen.dart';
import 'package:provider/provider.dart';
import 'package:mobile/providers/image_provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform
  );
  return runApp(const SocialApp());
}

// void main() => runApp(const SocialApp());

class SocialApp extends StatelessWidget {
  const SocialApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => ImageModel()),
          ChangeNotifierProvider(create: (_) => FetchPostModel())
        ],
        child: MaterialApp(
            title: 'Social App',
            theme:
                ThemeData(primaryColor: Colors.purple[900], useMaterial3: true),
            home: authGuard,
        )
    );
  }
}
