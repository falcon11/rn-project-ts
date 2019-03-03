export interface Post {
  id: number;
  title: string;
  body: string;
}
export type PostsState = {
  getingPosts: boolean;
  posts: Post[];
  post: Post | null;
};
