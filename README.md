# BookNest server with prisma postgresql

### live url - https://booknest-prisma.vercel.app

## All Api Endpoints and sample data

### User Routes

signup (POST) - https://booknest-prisma.vercel.app/api/v1/auth/signup

sample data -

```
{
"name": "customer5",
"email": "customer5@gmail.com",
"password": "1234",
"role": "customer",
"contactNo": "1234567890",
"address": "Dhaka, Bangladesh"
}
```

signIn (POST) - https://booknest-prisma.vercel.app/api/v1/auth/signin

sample data -

```
{
"email":"customer1@gmail.com",
"password":"1234"
}
```

get all (get) - https://booknest-prisma.vercel.app/api/v1/users

get by id (get) - https://booknest-prisma.vercel.app/api/v1/users/:id

update one (patch) - https://booknest-prisma.vercel.app/api/v1/users/:id

sample data -

```
{
    "contactNo": "0177455454",
    "address": "Chittagong, Bangladesh"
}
```

delete one (delete) - https://booknest-prisma.vercel.app/api/v1/users/:id

profile (get) - https://booknest-prisma.vercel.app/api/v1/profile

### Category Routes

create (post) - https://booknest-prisma.vercel.app/api/v1/categories/create-category

sample data -

```
{
    "title":"test1"
}
```

get all (get) - https://booknest-prisma.vercel.app/api/v1/categories

get single (get) - https://booknest-prisma.vercel.app/api/v1/categories/:id

update one (patch) - https://booknest-prisma.vercel.app/api/v1/categories/:id

sample data -

```
{
    "title":"updated title"
}
```

delete (delete) - https://booknest-prisma.vercel.app/api/v1/categories/:id

### Book Routes

create (post) - https://booknest-prisma.vercel.app/api/v1/books/create-book

sample data -

```
{
  "title": "test3",
  "author": "Neuton",
  "genre": "Fiction",
  "price": 350.75,
  "publicationDate": "2023-09-15T10:00:00Z",
  "categoryId": "1b92e2e0-d593-4333-9daf-9531a57abcaf"
}
```

get all (get ) - https://booknest-prisma.vercel.app/api/v1/books

get books by category id (get ) - https://booknest-prisma.vercel.app/api/v1/books/:categoryId/category

get single book (get) - https://booknest-prisma.vercel.app/api/v1/books/:id

update (patch) - https://booknest-prisma.vercel.app/api/v1/books/:id

sample data -

```
{
  "title": "Gravity",
  "author": "Neoton"
}
```

delete (delete ) - https://booknest-prisma.vercel.app/api/v1/books/:id

### Order Routes

create (post) - https://booknest-prisma.vercel.app/api/v1/orders/create-order

sample data -

```
{
  "userId": "41c1b81c-5ee7-467f-a0d9-49fc64f6b8a4",
  "orderedBooks": {
      "create":[
    {
      "bookId": "2677bbf5-87f8-4e3d-8e3e-197caae59958",
      "quantity": 3
    },
    {
      "bookId": "0b7b9ff2-ba1f-4e80-85cb-e60f659419b4",
      "quantity": 2
    }]
  }
}
```

get all (get )- https://booknest-prisma.vercel.app/api/v1/orders

get by order id - https://booknest-prisma.vercel.app/api/v1/orders/:id
