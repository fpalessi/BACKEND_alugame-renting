import multer from "multer";

export const imgMiddleware = multer({ dest: "uploads/" });
