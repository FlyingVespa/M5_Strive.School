import { body } from "express-validator";

const postValidation = [
  body("category").exists().withMessage("You have to provide the category"),
  body("title").exists().withMessage("You have to provide the title"),
  body("content").exists().withMessage("You have to specify content"),
];

// {
//   "_id": "SERVER GENERATED ID",
//   "category": "ARTICLE CATEGORY",
//   "title": "ARTICLE TITLE",
//   "cover": "ARTICLE COVER (IMAGE LINK)",
//   "readTime": {
//     "value": 2,
//     "unit": "minute"
//   },
//   "author": {
//     "name": "AUTHOR AVATAR NAME",
//     "avatar": "AUTHOR AVATAR LINK"
//   },
//   "content": "HTML",
//   "createdAt": "NEW DATE"
// }

export default postValidation;
