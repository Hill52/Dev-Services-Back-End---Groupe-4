import 'dart:io';
import 'package:elephant_app/providers/tasks_provider.dart';
import 'package:flutter/material.dart';
import 'package:elephant_app/models/task.dart';
import 'package:elephant_app/screens/task_master.dart';
import 'package:provider/provider.dart';

class TaskDetails extends StatefulWidget {
  final Task task;

  TaskDetails({required this.task});

  @override
  _TaskDetailsState createState() => _TaskDetailsState();
}

class _TaskDetailsState extends State<TaskDetails> {
  late TextEditingController _titleController;
  late TextEditingController _contentController;
  File? _imageFile;
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.task.title);
    _contentController = TextEditingController(text: widget.task.content);

    if (widget.task.image != null) {
      _imageFile = File(widget.task.image!);
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
return Consumer<TasksProvider>(
  builder: (context, provider, _) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Task Details'),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextFormField(
                  controller: _titleController,
                  decoration: InputDecoration(labelText: 'Title'),
                  onSaved: (value) {
                    widget.task.title = value!;
                  },
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please enter a title';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16.0),
                TextFormField(
                  controller: _contentController,
                  decoration: InputDecoration(labelText: 'Content'),
                  maxLines: null,
                  keyboardType: TextInputType.multiline,
                  onSaved: (value) {
                    widget.task.content = value!;
                  },
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please enter some content';
                    }
                    return null;
                  },
                ),
                if (_imageFile != null) ...[
                  SizedBox(height: 16.0),
                  Image.file(_imageFile??File(''), height: 300,),
                ],

                SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _formKey.currentState!.save();
                      provider.updateTask(widget.task);
                      Navigator.pop(context);
                    }
                  },
                  child: Text('Save'),
                ),

              ],
            ),
          ),
        ),
      ),
    );
  },
);

  }
}
