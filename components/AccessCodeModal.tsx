import React, { useState } from 'react';
import { verifyAccessCode } from '../services/apiService';

interface Props {
  onSuccess: (code: string) => void;
  onCancel: () => void;
}

export const AccessCodeModal: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const verifiedCode = code.trim().toUpperCase();
      const isValid = await verifyAccessCode(verifiedCode);
      if (isValid) {
        // 清除之前的答题记录，开始新测评
        localStorage.removeItem('asa_answers');
        onSuccess(verifiedCode);
      } else {
        setError("兑换码无效，请重试或联系客服。");
      }
    } catch (err) {
      setError("验证失败，请检查网络连接。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-pink-500"></div>
        
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">输入兑换码</h2>
        <p className="text-slate-500 mb-6">请输入您的专属兑换码以解锁完整的专业测评。</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="例如：TEST2025"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg tracking-widest text-center uppercase"
            />
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '验证中...' : '解锁测评'}
          </button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full py-2 text-slate-400 hover:text-slate-600 text-sm"
          >
            取消
          </button>
        </form>
      </div>
    </div>
  );
};
