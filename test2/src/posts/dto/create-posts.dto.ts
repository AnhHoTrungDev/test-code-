import { AuthorDto } from "../../authors/dto/create-authors.dto";
export class PostDto {
  id: string;
  readonly title: string;
  readonly content: string;
  readonly categories: [];
  createdAt: number;
  createdBy: AuthorDto;
}
