import 'package:flutter/material.dart';
import 'package:elephant_app/models/task.dart';
import 'package:faker/faker.dart';


class TasksProvider extends ChangeNotifier {
  List<Task> _tasks = [];

  List<Task> get tasks => _tasks;

  List<Task> initTasks() {
    List<Task> list = [];
    for (int i = 0; i <= 10; i++) {
      list.add(Task(
        id: Faker().randomGenerator.integer(1000),
        content: Faker().lorem.sentence(),
        completed: Faker().randomGenerator.boolean(),
        title: Faker().lorem.sentence(),
      ));
    }
    _tasks = list;
    notifyListeners();
    return _tasks;
  }

  Future<List<Task>> fetchTasks() async{
    print("object");  
    return _tasks;
  }

  Task addTask(Task task) {
    _tasks.add(task);
    notifyListeners();
    return task;
  }

  void removeTask(Task task) {
    _tasks.remove(task);
    notifyListeners();
  }

  void updateTask(Task task) {
    final index = _tasks.indexWhere((t) => t.id == task.id);
    if (index != -1) {
      print("task ${_tasks[index]} before updated}");
      _tasks[index] = task;
      print("task ${_tasks[index]} after updated}");
      // notifyListeners();
    }
    notifyListeners();
  }
}
