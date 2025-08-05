'use client';

import { useState } from 'react';
import { Comment } from '@/types/image';

interface CommentSectionProps {
  comments: Comment[];
  imageId: string;
  onAddComment: (imageId: string, text: string, author: string) => void;
  onDeleteComment: (imageId: string, commentId: string) => void;
}

export function CommentSection({ comments, imageId, onAddComment, onDeleteComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && author.trim()) {
      onAddComment(imageId, newComment.trim(), author.trim());
      setNewComment('');
      setAuthor('');
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Comments ({comments.length})
      </h3>
      
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-white focus:outline-none"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-white focus:outline-none resize-none"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
        >
          Post Comment
        </button>
      </form>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{comment.author}</h4>
                  <p className="text-gray-400 text-sm">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteComment(imageId, comment.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
