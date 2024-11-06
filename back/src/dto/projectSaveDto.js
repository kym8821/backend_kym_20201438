export class ProjectSaveDto {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export function isProjectSaveDto(dto) {
  if (typeof dto.title !== "string" || typeof dto.description !== "string") return false;
  return true;
}
