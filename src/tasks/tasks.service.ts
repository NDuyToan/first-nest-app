import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  // Mock data - dữ liệu giả lập
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Học NestJS',
      description: 'Hoàn thành bài học về Service và DI',
      completed: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: 'Tạo REST API',
      description: 'Xây dựng API cho ứng dụng Todo',
      completed: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
    },
    {
      id: 3,
      title: 'Viết Unit Test',
      description: 'Viết test cho service và controller',
      completed: false,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18'),
    },
  ];

  // Helper method: Tạo ID mới
  private generateNewId(): number {
    const maxId = Math.max(...this.tasks.map((task) => task.id));
    return maxId + 1;
  }

  // phương thức lấy tất cả tasks
  findAll(): Task[] {
    return this.tasks;
  }

  // Phương thức lấy task theo ID
  findById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  // tạo task mới
  create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: this.generateNewId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(newTask);

    return newTask;
  }

  // cập nhật task
  update(id: number, updateData: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return this.tasks[taskIndex];
  }

  // đánh dấu task hoàn thành
  maskAsCompleted(id: number): Task | null {
    return this.update(id, { completed: true });
  }

  // xoá task
  delete(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length < initialLength;
  }

  // lọc task theo trạng thái
  filterByStatus(completed: boolean): Task[] {
    return this.tasks.filter((task) => task.completed === completed);
  }

  // tìm kiếm theo từ khoá
  search(keyword: string): Task[] {
    const lowerKeyword = keyword.toLowerCase();

    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.description.toLowerCase().includes(lowerKeyword),
    );
  }
}
