'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageType } from '@/types/image';

interface ImageCardProps {
  image: ImageType;
  onDelete: (id: string) => void;
}

export function ImageCard({ image, onDelete }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group overflow-hidden rounded-lg bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative">
        <Image
          src={`/uploads/${image.filename}`}
          alt={image.originalName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
            <div className="text-center">
              <p className="text-white text-sm mb-2">{image.originalName}</p>
              <p className="text-gray-300 text-xs mb-4">
                {new Date(image.uploadDate).toLocaleDateString()}
              </p>
              <div className="flex gap-2 justify-center">
                <Link
                  href={`/gallery/${image.id}`}
                  className="px-3 py-1 bg-white text-black text-xs rounded hover:bg-gray-200 transition-colors"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(image.id)}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {image.comments.length > 0 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {image.comments.length} comment{image.comments.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
