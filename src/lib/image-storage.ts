import fs from 'fs';
import path from 'path';
import { Image } from '@/types/image';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const METADATA_FILE = path.join(process.cwd(), 'public', 'uploads', 'metadata.json');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Ensure metadata file exists
if (!fs.existsSync(METADATA_FILE)) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify([]));
}

export function getImages(): Image[] {
  try {
    const data = fs.readFileSync(METADATA_FILE, 'utf-8');
    return JSON.parse(data) as Image[];
  } catch (error) {
    console.error('Error reading images:', error);
    return [];
  }
}

export function saveImage(image: Image): void {
  const images = getImages();
  images.push(image);
  fs.writeFileSync(METADATA_FILE, JSON.stringify(images, null, 2));
}

export function deleteImage(id: string): boolean {
  const images = getImages();
  const imageIndex = images.findIndex(img => img.id === id);
  
  if (imageIndex === -1) return false;
  
  const image = images[imageIndex];
  const filePath = path.join(UPLOAD_DIR, image.filename);
  
  // Delete file
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  // Update metadata
  images.splice(imageIndex, 1);
  fs.writeFileSync(METADATA_FILE, JSON.stringify(images, null, 2));
  
  return true;
}

export function addComment(imageId: string, comment: any): boolean {
  const images = getImages();
  const imageIndex = images.findIndex(img => img.id === imageId);
  
  if (imageIndex === -1) return false;
  
  images[imageIndex].comments.push(comment);
  fs.writeFileSync(METADATA_FILE, JSON.stringify(images, null, 2));
  
  return true;
}

export function deleteComment(imageId: string, commentId: string): boolean {
  const images = getImages();
  const imageIndex = images.findIndex(img => img.id === imageId);
  
  if (imageIndex === -1) return false;
  
  const image = images[imageIndex];
  const commentIndex = image.comments.findIndex(c => c.id === commentId);
  
  if (commentIndex === -1) return false;
  
  image.comments.splice(commentIndex, 1);
  fs.writeFileSync(METADATA_FILE, JSON.stringify(images, null, 2));
  
  return true;
}
