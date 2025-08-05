'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CommentSection } from '@/components/comment-section';
import { Image as ImageType } from '@/types/image';

export default function ImageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [image, setImage] = useState<ImageType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImage();
  }, [params.id]);

  const fetchImage = async () => {
    try {
      const response = await fetch('/api/images');
      const data = await response.json();
      const foundImage = data.images?.find((img: ImageType) => img.id === params.id);
      
      if (foundImage) {
        setImage(foundImage);
      } else {
        router.push('/gallery');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      router.push('/gallery');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (imageId: string, text: string, author: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId, text, author }),
      });

      if (response.ok) {
        fetchImage(); // Refresh to get updated comments
      } else {
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  const handleDeleteComment = async (imageId: string, commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments?imageId=${imageId}&commentId=${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchImage(); // Refresh to get updated comments
      } else {
        alert('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/images?id=${image?.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/gallery');
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Image not found</h1>
          <Link href="/gallery" className="text-blue-400 hover:text-blue-300">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
                MP - Makata Pilipinas
              </Link>
              <p className="text-gray-400 mt-1">Image Details</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/gallery"
                className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Back to Gallery
              </Link>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete Image
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Display */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={`/uploads/${image.filename}`}
                alt={image.originalName}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-2">{image.originalName}</h1>
              <div className="text-gray-400 space-y-1">
                <p>Uploaded: {new Date(image.uploadDate).toLocaleString()}</p>
                <p>Size: {(image.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Comments: {image.comments.length}</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <CommentSection
              comments={image.comments}
              imageId={image.id}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
