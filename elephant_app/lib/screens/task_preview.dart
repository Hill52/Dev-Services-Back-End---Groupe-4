import 'package:flutter/material.dart';
import 'package:faker/faker.dart';
import 'package:elephant_app/models/task.dart';
import 'package:elephant_app/screens/task_details.dart';
import 'package:elephant_app/providers/tasks_provider.dart';
import 'package:provider/provider.dart';


class TaskPreview extends StatefulWidget {
  final Task task;

  const TaskPreview({required this.task});

  @override
  _TaskPreviewState createState() => _TaskPreviewState();
}

class _TaskPreviewState extends State<TaskPreview> {
  late TasksProvider _tasksProvider;

  @override
  void initState() {
    super.initState();
    _tasksProvider = Provider.of<TasksProvider>(context, listen: false);
  }

  void _navigateToTaskDetails(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => TaskDetails(task: widget.task)),
    );
  }

  @override
  Widget build(BuildContext context) {
    Color tileColor = widget.task.completed ? Colors.green : Colors.red;
    return ListTile(
      title: Text(widget.task.title ?? "No title"),
      subtitle: Text(widget.task.content),
      trailing: Checkbox(
        value: widget.task.completed,
        onChanged: (bool? value) {
          setState(() {
            _tasksProvider.updateTask(widget.task);
            widget.task.toggleCompleted();
          });
        },
      ),
      tileColor: tileColor,
      onTap: () => _navigateToTaskDetails(context),
    );
  }
}

