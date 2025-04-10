
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

type BalanceCardProps = {
  balance: number;
  currency: string;
  percentChange: number;
  tokens: Array<{
    name: string;
    symbol: string;
    amount: number;
    value: number;
    change: number;
  }>;
};

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  balance, 
  currency, 
  percentChange, 
  tokens 
}) => {
  return (
    <motion.div
      className="glass-card p-6 w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-crypto-text-secondary text-sm">Total Balance</div>
          <div className="text-3xl font-semibold mt-1">
            {currency}{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center mt-1 text-sm ${percentChange >= 0 ? 'text-crypto-success' : 'text-crypto-error'}`}>
            {percentChange >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}% this week
          </div>
        </div>
        <motion.div 
          className="p-3 rounded-full bg-primary/20 text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Wallet size={24} />
        </motion.div>
      </div>
      
      <div className="space-y-3 mt-6">
        <div className="text-sm font-medium flex justify-between items-center">
          <div>Your Assets</div>
          <div className="text-crypto-text-secondary text-xs">See All</div>
        </div>
        
        {tokens.map((token, index) => (
          <motion.div 
            key={token.symbol}
            className="flex items-center justify-between p-3 rounded-xl bg-crypto-card/60"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index % 3 === 0 ? 'bg-primary/20 text-primary' : 
                index % 3 === 1 ? 'bg-secondary/20 text-secondary' : 
                'bg-accent/20 text-accent'
              }`}>
                {token.symbol.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">{token.name}</div>
                <div className="text-xs text-crypto-text-secondary">{token.amount} {token.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">{currency}{token.value.toLocaleString()}</div>
              <div className={`text-xs ${token.change >= 0 ? 'text-crypto-success' : 'text-crypto-error'}`}>
                {token.change >= 0 ? '+' : ''}{token.change}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BalanceCard;
