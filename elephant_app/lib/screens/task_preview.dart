import 'package:flutter/material.dart';
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
  void _navigateToTaskDetails(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => TaskDetails(task: widget.task)),
    );
  }
  @override
  void initState() {
    super.initState();
    _tasksProvider = Provider.of<TasksProvider>(context, listen: false);
  }
  @override
  Widget build(BuildContext context) {
    Color tileColor = widget.task.completed ? Colors.green : Colors.red;
    return Dismissible(
      key: UniqueKey(),
      direction: DismissDirection.startToEnd,
      background: Container(
        color: Colors.red,
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Icon(Icons.delete, color: Colors.white),
              SizedBox(width: 10),
              Text(
                "Delete",
                style: TextStyle(color: Colors.white, fontSize: 18),
              ),
            ],
          ),
        ),
      ),
      confirmDismiss: (DismissDirection direction) async {
        final bool res = await showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                content: Text(
                    "Are you sure you want to delete ${widget.task.title}?"),
                actions: <Widget>[
                  TextButton(
                      onPressed: () => Navigator.of(context).pop(true),
                      child: Text("Delete")),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: Text("Cancel"),
                  ),
                ],
              );
            });
        return res;
      },
      onDismissed: (direction) {
        _tasksProvider.deleteTask(widget.task);
      },
      child: ListTile(
        title: Text(widget.task.title ?? "No title"),
        subtitle: Text(widget.task.content),
        trailing: Checkbox(
          value: widget.task.completed,
          onChanged: (bool? value) {
            setState(() {
              widget.task.toggleCompleted();
              _tasksProvider.updateTask(widget.task);
            });
          },
        ),
        tileColor: tileColor,
        onTap: () => _navigateToTaskDetails(context),
      ),
    );
  }
}