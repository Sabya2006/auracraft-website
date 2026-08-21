import React, { useState } from 'react';
import { X, Lock, Key, UserCheck } from 'lucide-react';
import API_BASE_URL from '../config/api';

export default function StaffLoginModal({ onClose, onLoginSuccess }) {
  const [oraCraftId, setOraCraftId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oraCraftId, password })
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        onLoginSuccess(data.token, data.user);
        onClose();
      } else {
        setErrorMsg(data.message || 'Invalid OraCraft ID or password.');
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
            <h3 className="text-base font-bold text-white">OraCraft Control Center Log In</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            
            <div>
              <label className="input-label flex items-center gap-1.5 text-xs font-bold text-gray-200">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                OraCraft ID *
              </label>
              <input
                type="text"
                required
                value={oraCraftId}
                onChange={(e) => setOraCraftId(e.target.value.toUpperCase())}
                placeholder="Enter assigned OraCraft ID"
                className="input-field uppercase font-mono font-bold tracking-wider text-amber-400"
              />
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5 text-xs font-bold text-gray-200">
                <Key className="w-3.5 h-3.5 text-gray-400" />
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-field"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/30 font-semibold leading-relaxed">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-extrabold py-3.5 rounded-xl text-xs transition-colors shadow-lg shadow-purple-600/30"
            >
              {loading ? 'Authenticating Token...' : 'Log In to Control Center'}
            </button>

          </form>

          <div className="text-center border-t border-white/10 pt-4">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              🔒 <strong>Closed Access System:</strong> Standard Gmail or unlisted email addresses are strictly rejected. Enter your Director-assigned OraCraft ID.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
