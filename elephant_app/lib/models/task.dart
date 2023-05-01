
class Task {
  String? id;
  late String content;
  late bool completed;
  String? title;
  late String image;

  Task({
    required this.content,
    required this.completed,
    this.title,
    this.id,
    required this.image,
  });

  void toggleCompleted() {
    completed = !completed;
  }

  // task to json
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['content'] = this.content;
    data['completed'] = this.completed;
    data['title'] = this.title;
    if (this.image != null) {
      data['image'] = this.image;
    }
    return data;
  }

  // json to task
  Task.fromJson(Map<String, dynamic> json) {
    id = json['id'].toString();
    content = json['content'] ?? "";
    completed = json['completed'];
    title = json['title'];
    if (json['image'] != null) {
      image = json['image'] ?? "";
    }
  }

  Task copyWith({String? id, String? content, bool? completed, String? title, String? image}) {
    return Task(
      id: id ?? this.id,
      content: content ?? this.content,
      completed: completed ?? this.completed,
      title: title ?? this.title,
      image: image ?? this.image,
    );
  }

  @override
  String toString() {
    return "Task {id: $id, title: $title, content: $content, completed: $completed, image: $image}";
  }
}
