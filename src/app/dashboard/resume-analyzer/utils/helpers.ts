export function categorizeSkills(skills: string[]) {
  const frontendKeywords = ["React", "Next", "TypeScript", "Tailwind", "HTML", "CSS", "JavaScript", "JS", "UI", "UX"];
  const backendKeywords = ["Node", "Express", "Java", "SQL", "MongoDB", "PostgreSQL", "REST", "JWT", "RBAC", "API"];
  const toolsKeywords = ["Git", "GitHub", "Postman", "Insomnia", "Cloudinary", "CI", "CD", "Docker", "Kubernetes", "AWS", "Redis", "GraphQL"];

  const frontend: string[] = [];
  const backend: string[] = [];
  const tools: string[] = [];

  for (const skill of skills) {
    const lower = skill.toLowerCase();
    if (frontendKeywords.some(k => lower.includes(k.toLowerCase()))) frontend.push(skill);
    else if (backendKeywords.some(k => lower.includes(k.toLowerCase()))) backend.push(skill);
    else tools.push(skill);
  }
  return { frontend, backend, tools };
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Improvement";
}

export function getDashOffset(score: number): number {
  const circumference = 2 * Math.PI * 88;
  return circumference - (score / 100) * circumference;
}