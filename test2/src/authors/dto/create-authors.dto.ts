// import { ObjectType, Field, Float } from "type-graphql";

// @ObjectType()
// export class AuthorType {
//   @Field()
//   readonly id: string;
//   @Field()
//   readonly firstName: string;
//   @Field()
//   readonly lastName: string;
//   @Field(() => Float)
//   readonly dob: number;
// }
export class AuthorDto {
  id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dob: number;
}
