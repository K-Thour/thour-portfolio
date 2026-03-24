export interface Technology {
  id: number;
  name: string;
  category: string;
  icon: string;
  proficiency?: number;
  iconType?: "emoji" | "url" | "image";
  iconUrl?: string;
  iconImage?: string;
}
