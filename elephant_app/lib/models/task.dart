class Task {
  String? id;
  late String content;
  late bool completed;
  String? title;

  Task({required this.content, required this.completed, this.title, this.id});
  void toggleCompleted() {
    completed = !completed;
  }

  //task to json
  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "content": content,
      "completed": completed,
      "title": title,
    };
  }
  //json to task
  Task.fromJson(Map<String, dynamic> json) {
    id = json['id'].toString();
    content = json['content'] ?? "";
    completed = json['completed'];
    title = json['title'];
  }

  @override
  toString() {
    return "Task {id: $id, title: $title, content: $content, completed: $completed}";
  }
}
