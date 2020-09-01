## Mục tiêu của bài test
1. Implement được apollo graphql trên framework nestjs
2. Sử dụng guard, context trên graphql
3. Sử dụng resolve property để sử liên kết các đối tượng
4. Sử dụng enum graphql
5. Sử dụng approach schema first (NESTJS docs - [section GraphQL](https://docs.nestjs.com/graphql/quick-start#schema-first)) để sử dụng cho type-checking cho resolver
## Mô tả
Bao gồm các GraphQL Object Type sau:
```
type Post {
  id: ID
  title: String
  content: String
  categories: [PostCategory]
  createdAt: Float
  createdBy: Author
}

type Query {
  post(postID: String!): Post
}

type Mutation {
  createPost(postInput: PostInput!): Post
}
```
với *PostCategory* là enum chỉ nhận các giá trị sau đây: *PROMOTIONAL, CONTROVERSIAL, LIFESTYLE* và *PERSONAL*. *PostInput* là kiểu input với các thuộc tính title (String), content(String) và categories là mảng các giá trị (chỉ nhận các giá trị thuộc PostCategory), **tất cả các thuộc tính đều bắt buộc**.
```
type Author {
  id: String
  firstName: String
  lastName: String
  dob: Float
}

type Query {
  author(authorID: String!): Author
}

type Mutation {
  createAuthor(author: AuthorInput!): Author
}
```
với kiểu AuthorInput bao gồm các thuộc tính *firstName(String)*, *lastName(String)* và *dob (Number)*, tất cả thuộc tính này đều bắt buộc.

<i style="color:red">Lưu ý:</i> tất cả id thuộc các GraphQL Type trên sử dụng uuid v4

## Yêu cầu
### Case 1
1. Ứng dụng có thể chạy được (Graphql endpoint is ready)
### Case 2: Function create author chạy đúng các yêu cầu dưới đây
1. Người dùng có thể tạo được author với đầy đủ các field yêu cầu, nhận được response đầy đủ thông tin như GraphQL SDL ở mục mô tả
2. Người dùng không thể tạo author nếu request data không đủ các field yêu cầu
### Case 3: Function create post chạy đúng các yêu cầu dướng đây
1. Chỉ tạo được Post với đầy đủ thông tin và *Authorization header* là token có dạng dưới đây (tương tự task 1)

```
Header: Bearer token
```
với object được hashed (với secret code là **s3cr3t**) như sau, sử dụng authorID này để dùng cho thuộc tính *createdBy* khi tạo Post
```
// authorID này sẽ được lấy từ case1
{
  authorID: string
}
```
2. Không tạo được *Post* nếu request không cung cấp token thông qua *authorization header*
3. Khi nhận được response, createdBy phải được resolved và link tới type *Author* theo *authorID*

```
{
  createPost {
    createdBy: {
      firstName: string
      lastName: string
    }
  }
}
```
4. Chỉ tạo được post với giá trị thuộc tính *categories* chỉ thuộc tập các giá trị khai báo trong phần mô tả

## Expected Test Result
<p align="center">
  <img src="./at/demo1.png" width="100%" alt="success example">
</p>