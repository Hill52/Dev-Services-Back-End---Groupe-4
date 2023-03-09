import 'package:flutter/material.dart';
import 'package:elephant_app/models/task.dart';
import 'package:faker/faker.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;

class TasksProvider extends ChangeNotifier {
  List<Task> _tasks = [];

  List<Task> get tasks => _tasks;

  Future<void> initTasks() async {
    final response = await supabase.from("tasks").select("*");
    _tasks = response.map((task) => Task.fromJson(task)).toList().cast<Task>();
    notifyListeners();
  }

  Future<List<Task>> fetchTasks() async {
    final response = await supabase.from("tasks").select("*");
    _tasks = response.map((task) => Task.fromJson(task)).toList().cast<Task>();
    notifyListeners();
    // print(_tasks);
    return _tasks;
  }

  Future<void> addTask(Task task) async {

    final reponse = await supabase.from("tasks").insert(task.toJson()).execute();
    if (reponse.status != 201) {
      print("Error");
    } else {
      _tasks.add(task);
      print("Success");
    }
    notifyListeners();
  }

  Future<void> updateTask(Task task) async {}

  Future<void> deleteTask(String id) async {}

  Future<void> completeTask(String id) async {}

  Future<void> uncompleteTask(String id) async {}
}
