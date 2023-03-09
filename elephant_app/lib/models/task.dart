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
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['content'] = this.content;
    data['completed'] = this.completed;
    data['title'] = this.title;
    return data;
  }
  //json to task
  Task.fromJson(Map<String, dynamic> json) {
    id = json['id'].toString();
    content = json['content'] ?? "";
    completed = json['completed'];
    title = json['title'];
  }


  Task copyWith({String? id, String? content, bool? completed, String? title}) {
    return Task(
      id: id ?? this.id,
      content: content ?? this.content,
      completed: completed ?? this.completed,
      title: title ?? this.title,
    );
  }

  @override
  toString() {
    return "Task {id: $id, title: $title, content: $content, completed: $completed}";
  }
}
