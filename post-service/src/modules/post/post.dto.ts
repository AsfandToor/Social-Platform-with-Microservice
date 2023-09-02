export type CreatePostDto = {
  caption: string;
  images: string[];
  author: string;
};

export type UpdatePostDto = {
  caption?: string;
  images?: string[];
};
