import React, { useState } from 'react';
import { X, Lock, Mail, Key, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config/api';

export default function StaffLoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickFill = () => {
    setEmail('admin@auracraft.com');
    // Fill placeholder for quick demo testing
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        onLoginSuccess(data.token, data.user);
        onClose();
      } else {
        setErrorMsg(data.message || 'Invalid staff credentials');
      }
    } catch (err) {
      setLoading(false);
      console.warn('[Login Network Error]', err.message);
      setErrorMsg('Unable to connect to authentication server. Please check your backend connection.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel w-full max-w-md overflow-hidden border-purple-500/40 shadow-2xl relative bg-[#080c1b]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d132a]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Internal Corporate Staff Portal</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Demo Pre-fill Banner */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Demo Staff Login Assistant</span>
            </div>
            <button
              onClick={handleQuickFill}
              className="bg-purple-500 text-black font-extrabold px-3 py-1 rounded-lg hover:bg-purple-400 transition-colors"
            >
              Fill Staff Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="input-label flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                Corporate Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@auracraft.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gray-400" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 font-semibold">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-purple-600/30"
            >
              {loading ? 'Authenticating Staff Token...' : 'Log In to Staff Dashboard'}
            </button>

          </form>

          <div className="text-center border-t border-white/10 pt-4">
            <p className="text-[11px] text-gray-500">
              Restricted area for authorized AuraCraft agency directors & account managers only.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
