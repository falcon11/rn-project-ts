export interface Post {
  id: number;
  title: string;
  body: string;
}
export type PostsState = {
  posts: Post[];
};
