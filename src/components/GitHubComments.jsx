import React, { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Reply, User, Calendar, ExternalLink } from 'lucide-react';

const GitHubComments = ({ cardName, issueNumber }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(null);

  // 模拟数据 - 实际使用时替换为GitHub API调用
  useEffect(() => {
    const mockComments = [
      {
        id: 1,
        user: {
          login: 'cryptouser123',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        },
        body: '这张卡的手续费确实很低，我已经用了半年了，体验不错。KYC流程也比较简单。',
        created_at: '2024-01-20T10:30:00Z',
        reactions: { '+1': 5, heart: 2 },
        html_url: 'https://github.com/repo/issues/1#issuecomment-1'
      },
      {
        id: 2,
        user: {
          login: 'defi_trader',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        },
        body: '有人知道这张卡在欧洲的ATM取现费用吗？文章里没有详细说明。',
        created_at: '2024-01-21T14:15:00Z',
        reactions: { '+1': 2 },
        html_url: 'https://github.com/repo/issues/1#issuecomment-2'
      },
      {
        id: 3,
        user: {
          login: 'cardmaster',
          avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        },
        body: '@defi_trader 欧洲ATM取现是2.5%的手续费，但是每月前3次免费。我在德国用过，确认无误。',
        created_at: '2024-01-21T16:45:00Z',
        reactions: { '+1': 8, heart: 1 },
        html_url: 'https://github.com/repo/issues/1#issuecomment-3'
      }
    ];
    
    setTimeout(() => {
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [issueNumber]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReaction = (commentId, emoji) => {
    // 实际实现中调用GitHub API添加reaction
    console.log(`Adding ${emoji} reaction to comment ${commentId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              评论讨论 ({comments.length})
            </h3>
          </div>
          <a 
            href={`https://github.com/your-repo/issues/${issueNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>在GitHub上查看</span>
          </a>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex space-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={comment.user.avatar_url}
                  alt={comment.user.login}
                  className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                />
              </div>
              
              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">
                    {comment.user.login}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(comment.created_at)}</span>
                  </div>
                </div>
                
                {/* Comment Body */}
                <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                  <p className="leading-relaxed">{comment.body}</p>
                </div>
                
                {/* Reactions & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Reactions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleReaction(comment.id, '+1')}
                        className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.reactions['+1'] || 0}</span>
                      </button>
                      
                      {comment.reactions.heart > 0 && (
                        <button
                          onClick={() => handleReaction(comment.id, 'heart')}
                          className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        >
                          <span>❤️</span>
                          <span>{comment.reactions.heart}</span>
                        </button>
                      )}
                    </div>
                    
                    {/* Reply Button */}
                    <button
                      onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                      className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Reply className="w-3 h-3" />
                      <span>回复</span>
                    </button>
                  </div>
                  
                  {/* View on GitHub Link */}
                  <a
                    href={comment.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    查看原文
                  </a>
                </div>
                
                {/* Reply Form */}
                {showReplyForm === comment.id && (
                  <div className="mt-4 ml-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <textarea
                      placeholder={`回复 @${comment.user.login}...`}
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => setShowReplyForm(null)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        取消
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        回复
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Section */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的使用体验，或提出问题..."
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              rows="4"
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">
                评论将同步到 <a href="#" className="text-blue-600 hover:underline">GitHub Issues</a>
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  预览
                </button>
                <button 
                  disabled={!newComment.trim()}
                  className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  发表评论
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto.com Visa Card 深度评测</h1>
          <p className="text-gray-600">最后更新：2024年1月20日</p>
        </div>
        
        {/* Article content would go here */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              这里是文章内容区域。用户阅读完评测文章后，可以在下方的评论区域进行讨论和交流。
              评论数据存储在GitHub Issues中，保证了数据的持久性和可靠性。
            </p>
          </div>
        </div>

        <GitHubComments cardName="crypto-com-visa-card" issueNumber={123} />
      </div>
    </div>
  );
}