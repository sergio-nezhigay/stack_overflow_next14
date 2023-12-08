export const questions = [
  {
    _id: "1",
    title:
      "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
    tags: [
      { _id: "tag1", name: "Tag 1" },
      { _id: "tag2", name: "Tag 2" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "author1.jpg",
      clerkId: "clerk123",
    },
    upvotes: 2, // Number of upvotes
    views: 100,
    answers: [
      { text: "Sample answer 1", author: "user1" },
      { text: "Sample answer 2", author: "user2" },
    ],
    createdAt: new Date("2023-01-01T12:00:00Z"),
    clerkId: "clerk123",
  },
  {
    _id: "2",
    title: "Sample Question 2",
    tags: [
      { _id: "tag3", name: "Tag 3" },
      { _id: "tag4", name: "Tag 4" },
    ],
    author: {
      _id: "author2",
      name: "Jane Smith",
      picture: "author2.jpg",
      clerkId: "clerk456",
    },
    upvotes: 2, // Number of upvotes
    views: 150,
    answers: [
      { text: "Sample answer 3", author: "user3" },
      { text: "Sample answer 4", author: "user4" },
    ],
    createdAt: new Date("2023-02-01T10:30:00Z"),
  },
  {
    _id: "3",
    title: "Sample Question 3",
    tags: [
      { _id: "tag5", name: "Tag 5" },
      { _id: "tag6", name: "Tag 6" },
    ],
    author: {
      _id: "author3",
      name: "Alice Johnson",
      picture: "author3.jpg",
      clerkId: "clerk789",
    },
    upvotes: 2, // Number of upvotes
    views: 120,
    answers: [
      { text: "Sample answer 5", author: "user5" },
      { text: "Sample answer 6", author: "user6" },
    ],
    createdAt: new Date("2023-03-15T08:45:00Z"),
  },
  {
    _id: "4",
    title: "Sample Question 4",
    tags: [
      { _id: "tag7", name: "Tag 7" },
      { _id: "tag8", name: "Tag 8" },
    ],
    author: {
      _id: "author4",
      name: "Bob Anderson",
      picture: "author4.jpg",
      clerkId: "clerk101",
    },
    upvotes: 2, // Number of upvotes
    views: 80,
    answers: [
      { text: "Sample answer 7", author: "user7" },
      { text: "Sample answer 8", author: "user8" },
    ],
    createdAt: new Date("2023-04-20T14:20:00Z"),
  },
  {
    _id: "5",
    title: "Sample Question 5",
    tags: [
      { _id: "tag9", name: "Tag 9" },
      { _id: "tag10", name: "Tag 10" },
    ],
    author: {
      _id: "author5",
      name: "Eva Martinez",
      picture: "author5.jpg",
      clerkId: "clerk112",
    },
    upvotes: 2, // Number of upvotes
    views: 200,
    answers: [
      { text: "Sample answer 9", author: "user9" },
      { text: "Sample answer 10", author: "user10" },
    ],
    createdAt: new Date("2023-05-10T18:30:00Z"),
  },
  {
    _id: "6",
    title: "Sample Question 6",
    tags: [
      { _id: "tag11", name: "Tag 11" },
      { _id: "tag12", name: "Tag 12" },
    ],
    author: {
      _id: "author6",
      name: "Chris Thompson",
      picture: "author6.jpg",
      clerkId: "clerk223",
    },
    upvotes: 2, // Number of upvotes
    views: 90,
    answers: [
      { text: "Sample answer 11", author: "user11" },
      { text: "Sample answer 12", author: "user12" },
    ],
    createdAt: new Date("2023-06-25T09:15:00Z"),
  },
  {
    _id: "7",
    title: "Sample Question 7",
    tags: [
      { _id: "tag13", name: "Tag 13" },
      { _id: "tag14", name: "Tag 14" },
    ],
    author: {
      _id: "author7",
      name: "Michael Davis",
      picture: "author7.jpg",
      clerkId: "clerk334",
    },
    upvotes: 2, // Number of upvotes
    views: 180,
    answers: [
      { text: "Sample answer 13", author: "user13" },
      { text: "Sample answer 14", author: "user14" },
    ],
    createdAt: new Date("2023-07-12T12:45:00Z"),
  },
];

// You can use testQuestions in your tests or wherever you need to simulate data fitting the QuestionProps interface
