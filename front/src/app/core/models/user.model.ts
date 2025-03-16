export type User = {
  token: string;
  id: number;
  email: string;
  username: string;
  dateCreated: string;
  dateUpdated: string;
};

export type UpdateUserDto = {
  username: string;
  email: string;
  password: string;
};
