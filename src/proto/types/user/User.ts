// Original file: src/proto/user.proto

export interface User {
  id?: number;
  name?: string;
  email?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  _image?: "image";
  _created_at?: "created_at";
  _updated_at?: "updated_at";
}

export interface User__Output {
  id?: number;
  name?: string;
  email?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}
