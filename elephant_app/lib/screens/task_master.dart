import 'package:flutter/material.dart';
import 'package:faker/faker.dart';
import 'package:elephant_app/models/task.dart';
import 'package:elephant_app/screens/task_preview.dart';
import 'package:elephant_app/screens/task_form.dart';
import 'package:elephant_app/providers/tasks_provider.dart';
import 'package:provider/provider.dart';

class TasksMaster extends StatefulWidget {
  const TasksMaster({super.key});
  @override
  _TasksMasterState createState() => _TasksMasterState();
}

class _TasksMasterState extends State<TasksMaster> {

  // @override
  // void initState() {
  //   super.initState();
  //   _fetchTasks();
  // }

  // void _fetchTasks() {
  //   List<Task> list = [];
  //   for (int i = 0; i <= 10; i++) {
  //     list.add(Task(
  //       content: Faker().lorem.sentence(),
  //       completed: Faker().randomGenerator.boolean(),
  //       title: Faker().lorem.sentence(),
  //     ));
  //   }
  //   list[2].title = "hello";
  //   setState(() {
  //     _tasks = list;
  //   });
  // }

  // void _addTask(Task task) {
  //   setState(() {
  //     _tasks.add(task);
  //   });
  // }

  void _navigateToTaskForm(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => TaskForm()),
      // MaterialPageRoute(builder: (context) => TaskForm(addTask: _addTask)),
    );
    if (result != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Nouvelle tâche ajoutée!'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      // body: FutureBuilder(
      //   future: Provider.of<TasksProvider>(context, listen: false).fetchTasks(),
      //   builder: (BuildContext context, AsyncSnapshot<List<Task>> snapshot) {
      //     print("hi");
      //     if (snapshot.hasData) {
      //       print("hi2");
      //       // List tasks = Provider.of<TasksProvider>(context, listen: false).tasks;
      //       List tasks = snapshot.data!;
      //       return Padding(
      //         padding: const EdgeInsets.only(bottom: 80.0),
      //         child: ListView.builder(
      //           itemCount: tasks == null ? 0 : tasks.length,
      //           itemBuilder: (BuildContext context, int index) {
      //             Task task = tasks[index];
      //             return TaskPreview(task: task);
      //           },
      //         ),
      //       );
      //     } else {
      //       return Center(
      //         child: CircularProgressIndicator(),
      //       );
      //     }
      //   },
      // ),
      body: Consumer<TasksProvider>(
        builder: (context, tasksProvider, child) {
          List tasks = tasksProvider.tasks;
          return Padding(
            padding: const EdgeInsets.only(bottom: 80.0),
            child: ListView.builder(
              itemCount: tasks == null ? 0 : tasks.length,
              itemBuilder: (BuildContext context, int index) {
                Task task = tasks[index];
                return TaskPreview(task: task);
              },
            ),
          );
        },
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 50.0),
        child: FloatingActionButton(
          onPressed: () {
            _navigateToTaskForm(context);
          },
          child: Icon(Icons.add),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );




    // Scaffold(
    //   body: Padding(
    //     padding: const EdgeInsets.only(bottom: 80.0),
    //     child: ListView.builder(
    //       itemCount: _tasks == null ? 0 : _tasks.length,
    //       itemBuilder: (BuildContext context, int index) {
    //         Task task = _tasks[index];
    //         return TaskPreview(task: task);
    //       },
    //     ),
    //   ),
    //   floatingActionButton: Padding(
    //     padding: const EdgeInsets.only(bottom: 50.0),
    //     child: FloatingActionButton(
    //       onPressed: () {
    //         _navigateToTaskForm(context);
    //       },
    //       child: Icon(Icons.add),
    //     ),
    //   ),
    //   floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    // );
  }
}