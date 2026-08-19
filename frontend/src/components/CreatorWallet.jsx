import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, CheckCircle2, CreditCard, Shield, RefreshCw } from 'lucide-react';

export default function CreatorWallet() {
  const [balance, setBalance] = useState(142500);
  const [withdrawnTotal, setWithdrawnTotal] = useState(85000);
  const [payoutMethod, setPayoutMethod] = useState('UPI');
  const [withdrawAmount, setWithdrawAmount] = useState('25000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 'tx1', brand: 'TechGear Pro Sponsorship', amount: '₹65,000', date: 'Yesterday', status: 'Completed' },
    { id: 'tx2', brand: 'AdSense & Auto-Dubbing Revenue', amount: '₹32,500', date: '3 days ago', status: 'Completed' },
    { id: 'tx3', brand: 'CloudStudio Barter Bonus', amount: '₹45,000', date: '1 week ago', status: 'Completed' }
  ]);

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    const numAmt = parseInt(withdrawAmount.replace(/[^0-9]/g, '')) || 0;
    if (numAmt <= 0 || numAmt > balance) return;

    setIsProcessing(true);
    setTimeout(() => {
      setBalance(balance - numAmt);
      setWithdrawnTotal(withdrawnTotal + numAmt);
      setTransactions([
        { id: `tx_${Date.now()}`, brand: `Instant Payout via ${payoutMethod}`, amount: `-₹${numAmt.toLocaleString()}`, date: 'Just now', status: 'Processing' },
        ...transactions
      ]);
      setIsProcessing(false);
      setPayoutSuccess(true);
      setTimeout(() => setPayoutSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
        marginBottom: '24px'
      }}>
        <span className="badge-tag badge-green" style={{ marginBottom: '10px' }}>
          <Shield size={12} /> Instant 0-Fee Payout Network
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          Creator Earnings <span className="gradient-text">Wallet</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Track real-time earnings from Brand Hub deals, video views, and multi-lingual dubbing CPMs. Withdraw instantly to your UPI, Bank Account, or Crypto Wallet.
        </p>
      </div>

      {/* Balance Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Available Balance</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            ₹{balance.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Ready for instant payout
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Lifetime Earned</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>
            ₹{(balance + withdrawnTotal).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
            +28% vs Last Month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Withdrawn</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc' }}>
            ₹{withdrawnTotal.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Transferred to Bank
          </div>
        </div>
      </div>

      {/* Payout Action Panel & History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Payout Form */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="#34d399" /> Initiate Instant Withdrawal
          </h3>

          {payoutSuccess && (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> Payout request submitted! Funds will reflect in 60s.
            </div>
          )}

          <form onSubmit={handlePayoutSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Select Payout Method:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['UPI / GPay', 'Bank Account', 'USDT / Crypto'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayoutMethod(method)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '10px',
                      border: payoutMethod === method ? '1px solid #34d399' : '1px solid var(--border-color)',
                      backgroundColor: payoutMethod === method ? 'rgba(16, 185, 129, 0.2)' : '#172033',
                      color: payoutMethod === method ? '#34d399' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Withdrawal Amount (₹):
              </label>
              <input 
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: '#172033',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="gradient-btn"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {isProcessing ? (
                <> <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing Bank Transfer... </>
              ) : (
                <> <ArrowUpRight size={16} /> Withdraw ₹{parseInt(withdrawAmount || 0).toLocaleString()} Now </>
              )}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', color: '#38bdf8' }}>
            Recent Revenue Transactions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transactions.map(tx => (
              <div key={tx.id} style={{ backgroundColor: '#182238', padding: '12px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{tx.brand}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{tx.date} • {tx.status}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: tx.amount.startsWith('-') ? '#ff3b5c' : '#34d399' }}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
