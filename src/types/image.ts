export interface Image {
  id: string;
  filename: string;
  originalName: string;
  uploadDate: string;
  size: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface UploadResponse {
  success: boolean;
  image?: Image;
  error?: string;
}
