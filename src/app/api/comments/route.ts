import { NextRequest, NextResponse } from 'next/server';
import { addComment, deleteComment } from '@/lib/image-storage';
import { Comment } from '@/types/image';

export async function POST(request: NextRequest) {
  try {
    const { imageId, text, author } = await request.json();

    if (!imageId || !text || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text,
      author,
      timestamp: new Date().toISOString()
    };

    const success = addComment(imageId, comment);

    if (!success) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');
    const commentId = searchParams.get('commentId');

    if (!imageId || !commentId) {
      return NextResponse.json({ error: 'Image ID and Comment ID are required' }, { status: 400 });
    }

    const success = deleteComment(imageId, commentId);

    if (!success) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
