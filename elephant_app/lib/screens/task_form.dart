
import 'dart:io';

import 'package:elephant_app/providers/tasks_provider.dart';
import 'package:flutter/material.dart';
import 'package:elephant_app/models/task.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';



class TaskForm extends StatefulWidget {
  // final Function addTask;

  // TaskForm({required this.addTask});


  @override
  _TaskFormState createState() => _TaskFormState();
}

class _TaskFormState extends State<TaskForm> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();

  File? file;
  bool isFile = false;

  void takeImageWithCamera() async {
    XFile? XFileImage = await ImagePicker().pickImage(source: ImageSource.camera);
    File image = File(XFileImage!.path);
    Navigator.of(context).pop();
    setState(() {
      file = image;
      isFile = true;
    });
  }

  void cancel() {
    Navigator.of(context).pop();
  }

  void chooseImageFromGallery() async{
    XFile? XFileImage = await ImagePicker().pickImage(source: ImageSource.gallery);
    File image = File(XFileImage!.path);
    Navigator.of(context).pop();
    setState(() {
      file = image;
      isFile = true;
    });
  }


  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      Task task = Task(
        title: _titleController.text,
        content: _contentController.text,
        completed: false,
      );
      context.read<TasksProvider>().addTask(task);
      // widget.addTask(task);
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Nouvelle tâche ajoutée!'),
        duration: Duration(seconds: 2),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nouvelle tâche'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(labelText: 'Titre'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Veuillez saisir un titre';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contentController,
                decoration: InputDecoration(labelText: 'Description'),
              ),
              isFile ? Image.file(file!, height: 300,) :
              Text("Aucune image sélectionnée"),
              const SizedBox(height: 16.0),
              TextButton(onPressed: (){
                showDialog(context: context, builder: (context){
                  return AlertDialog(
                    title: Text("Ajouter une image"),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        TextButton(onPressed: (){
                          takeImageWithCamera();
                        }, child: Text("Prendre une photo")),
                        TextButton(onPressed: (){
                          chooseImageFromGallery();
                        }, child: Text("Choisir une photo")),
                        TextButton(onPressed: (){
                          cancel();
                        }, child: Text("Annuler")),
                        
                      ],
                    ),
                  );
                });
              }, 
              child: const Text('Ajouter une image')
              ),
              SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: _submitForm,
                child: Text('Ajouter'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}