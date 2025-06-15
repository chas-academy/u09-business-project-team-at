export interface List {
  _id: string;
  recipes: string[];
  name: string;
  description: string;
  isDeleted?: boolean;
  deletedAt?: Date;
}
