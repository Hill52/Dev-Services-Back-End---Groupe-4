import 'dart:html';

import 'package:elephant_app/screens/task_master.dart';
import 'package:flutter/material.dart';
import 'package:elephant_app/screens/task_form.dart';

class Elephant_App extends StatefulWidget {
  @override
  _Elephant_AppState createState() => _Elephant_AppState();
}

class _Elephant_AppState extends State<Elephant_App> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Elephant App',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Elephant'),
        ),
        body: TasksMaster(),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            print("ok");
            // ici, vous pouvez définir ce qui se passe lorsque vous appuyez sur le bouton
          },
          tooltip: 'Ajouter un éléphant',
          child: Icon(Icons.add),
        )
      ),
    );
  }

}
