export class ProjectResponseDto {
  constructor(projectRow) {
    this.id = projectRow.id;
    this.title = projectRow.title;
    this.description = projectRow.description;
    try {
      this.tasks = JSON.parse(projectRow.tasks);
      if (!Array.isArray(this.tasks)) {
        throw new Error('tasks는 배열이어야 합니다.');
      }
    } catch (error) {
      console.error('tasks 변환 오류:', error);
      this.tasks = [];
    }
  }
}
