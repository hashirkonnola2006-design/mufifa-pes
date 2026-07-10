import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminLogin } from '../../lib/api';
import { setToken } from '../../lib/auth';

export default function AdminLogin({ setActiveTab }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(username.trim(), password);
      setToken(data.token);
      setActiveTab('admin-dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fadeIn">
      {/* Lock Icon Header */}
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <Lock className="w-6 h-6 text-blue-400" />
        </div>
        <div className="text-center">
          <h1 className="text-white text-xl font-black tracking-tight">Admin Login</h1>
          <p className="text-zinc-500 text-xs mt-1 font-medium">MUFIFA Tournament Control Panel</p>
        </div>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-950 border border-zinc-800/60 rounded-2xl p-6 space-y-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:bg-zinc-900 transition-colors duration-200"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-950/40 border border-red-800/40 rounded-xl px-3 py-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-300 text-xs font-medium">{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !username || !password}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-black text-sm py-3 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_4px_15px_rgba(59,130,246,0.2)] disabled:shadow-none"
          style={{ height: '48px' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Authenticating...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Back link */}
      <button
        onClick={() => setActiveTab('home')}
        className="mt-6 text-zinc-600 text-xs hover:text-zinc-400 transition-colors duration-200 font-medium"
      >
        ← Back to Tournament
      </button>
    </div>
  );
}
