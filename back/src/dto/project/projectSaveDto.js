export class ProjectSaveDto {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export function isProjectSaveDto(dto) {
  if (!dto.title || !dto.description) return false;
  return true;
}
