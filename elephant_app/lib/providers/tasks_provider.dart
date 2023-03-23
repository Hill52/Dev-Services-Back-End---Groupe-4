import 'package:flutter/material.dart';
import 'package:elephant_app/models/task.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uuid/uuid.dart';

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
    final newTask = task.copyWith(id: const Uuid().v4()); // generate random id
    final response =
        await supabase.from("tasks").insert(newTask.toJson()).execute();
    if (response.status != 201) {
      print("Error");
    } else {
      _tasks.add(
          newTask); // mettre à jour la liste _tasks en mémoire avec la nouvelle tâche
      print("Success");
      notifyListeners();
    }
  }

  Future<void> updateTask(Task task) async {
    final response = await supabase
        .from("tasks")
        .update(task.toJson())
        .match({'id': task.id}).execute(); // Ajouter cette ligne
    if (response.status != 204) {
      print("Error MECCC PROVIDER");
      print(response.status);
    } else {
      print(_tasks);
      final index = _tasks.indexWhere((t) => t.id == task.id);
      print(_tasks);

      _tasks[index] = task; // Mettre à jour l'état local de la tâche

      notifyListeners();
    }
  }

  Future<void> deleteTask(Task task) async {
    final response =
        await supabase.from("tasks").delete().match({'id': task.id}).execute();
    if (response.status != 204) {
      print("Error");
    } else {
      _tasks.remove(task); // Retirer la tâche de la liste _tasks
      print("Success");
      notifyListeners();
    }
  }

  Future<void> uncompleteTask(String id) async {}
}



/**
Future<void> addTask(Task task) async {
  final response = await supabase.from("tasks").insert(task.toJson());
  if (response.error != null) {
    throw response.error!.message;
  } else {
    _tasks.add(task);
    notifyListeners();
  }
}

Future<void> updateTask(Task task) async {
  final response =
      await supabase.from("tasks").update(task.toJson()).match({'id': task.id}).single();
  if (response.error != null) {
    throw response.error!.message;
  } else {
    final index = _tasks.indexWhere((t) => t.id == task.id);
    _tasks[index] = task;
    notifyListeners();
  }
}

Future<void> deleteTask(String id) async {
  final response = await supabase.from("tasks").delete().match({'id': id}).single();
  if (response.error != null) {
    throw response.error!.message;
  } else {
    _tasks.removeWhere((t) => t.id == id);
    notifyListeners();
  }
}

Future<void> completeTask(String id) async {
  final response = await supabase
      .from("tasks")
      .update({'completed': true}).match({'id': id}).single();
  if (response.error != null) {
    throw response.error!.message;
  } else {
    final index = _tasks.indexWhere((t) => t.id == id);
    _tasks[index].completed = true;
    notifyListeners();
  }
}

Future<void> uncompleteTask(String id) async {
  final response = await supabase
      .from("tasks")
      .update({'completed': false}).match({'id': id}).single();
  if (response.error != null) {
    throw response.error!.message;
  } else {
    final index = _tasks.indexWhere((t) => t.id == id);
    _tasks[index].completed = false;
    notifyListeners();
  }
}

 */