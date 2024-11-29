import React, { useState } from 'react';
import { Send } from 'lucide-react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = {
      id: comments.length + 1,
      author: 'Dr. Sarah Chen', // Replace with dynamic data
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop',
      content: newComment,
      timestamp: 'Just now'
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

return (
    <div className="comments-container mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments & Observations</h2>
        <form onSubmit={handleSubmit} className="comment-form mb-6">
            <div className="comment-input-container">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add your medical observations..."
                    className="w-full px-4 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                />
            </div>
            <button
                type="submit"
                className="comment-submit"
            >
                <Send className="w-4 h-4" />
                Add Comment
            </button>
        </form>
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <img src={comment.avatar} alt={`${comment.author}'s avatar`} />
                    <div className="comment-content">
                        <div className="flex items-center gap-2">
                            <span className="comment-author">{comment.author}</span>
                            <span className="mx-2">  </span>
                            <span className="comment-time">{comment.timestamp}</span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default CommentSection;
