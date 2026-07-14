import { simulateDelay } from "@/lib/utils";
import researchData from "@/data/research.json";

interface ResearchReport {
  id: string;
  title: string;
  date: string;
  author: string;
  type: string;
  summary: string;
}

const data = researchData as { reports: ResearchReport[] };

export async function getResearchReports(): Promise<ResearchReport[]> {
  await simulateDelay();
  return data.reports;
}
