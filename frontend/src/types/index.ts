export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  year: string;
}

export interface Profile {
  name: string;
  title: string;
  about: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
}
