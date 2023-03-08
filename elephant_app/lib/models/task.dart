class Task {
  int? id;
  String content;
  bool completed;
  String? title;

  Task({required this.content, required this.completed, this.title, this.id});
  void toggleCompleted() {
    completed = !completed;
  }
}
