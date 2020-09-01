import { Author } from "../../authors/interfaces/authors.interface";

export interface Post {
  id: string;
  title: string;
  content: string;
  categories: [];
  createdAt: number;
  createdBy: Author;
}
