class Task {
  int? id;
  String content;
  bool completed;
  String? title;

  Task({required this.content, required this.completed, this.title, this.id});
  void toggleCompleted() {
    completed = !completed;
  }

  @override
  toString() {
    return "Task {id: $id, title: $title, content: $content, completed: $completed}";
  }
}
