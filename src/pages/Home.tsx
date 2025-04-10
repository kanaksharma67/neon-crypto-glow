
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BalanceCard from '@/components/BalanceCard';
import QuickActions from '@/components/QuickActions';
import TransactionList from '@/components/TransactionList';
import SpendingChart from '@/components/SpendingChart';
import PaymentButton from '@/components/PaymentButton';
import { Transaction } from '@/components/TransactionList';

const Home = () => {
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('weekly');
  
  // Sample data for the balance card
  const balanceData = {
    balance: 8452.97,
    currency: '$',
    percentChange: 4.5,
    tokens: [
      { name: 'Bitcoin', symbol: 'BTC', amount: 0.58, value: 5280.42, change: 3.2 },
      { name: 'Ethereum', symbol: 'ETH', amount: 4.6, value: 2458.15, change: -1.8 },
      { name: 'Solana', symbol: 'SOL', amount: 32.4, value: 714.40, change: 8.5 },
    ],
  };
  
  // Sample data for the recent transactions
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'sent',
      title: 'To Alex Williams',
      amount: 250.00,
      currency: '$',
      date: new Date('2025-04-08'),
      status: 'completed',
    },
    {
      id: '2',
      type: 'received',
      title: 'From John Smith',
      amount: 125.50,
      currency: '$',
      date: new Date('2025-04-07'),
      status: 'completed',
    },
    {
      id: '3',
      type: 'converted',
      title: 'BTC to ETH',
      amount: 540.75,
      currency: '$',
      date: new Date('2025-04-05'),
      status: 'completed',
    },
    {
      id: '4',
      type: 'split',
      title: 'Dinner with friends',
      amount: 42.30,
      currency: '$',
      date: new Date('2025-04-03'),
      status: 'pending',
    },
  ];
  
  // Sample data for the spending chart
  const weeklyChartData = [
    { name: 'Mon', amount: 150 },
    { name: 'Tue', amount: 230 },
    { name: 'Wed', amount: 180 },
    { name: 'Thu', amount: 350 },
    { name: 'Fri', amount: 280 },
    { name: 'Sat', amount: 450 },
    { name: 'Sun', amount: 200 },
  ];
  
  const monthlyChartData = [
    { name: 'Jan', amount: 1200 },
    { name: 'Feb', amount: 940 },
    { name: 'Mar', amount: 1100 },
    { name: 'Apr', amount: 1400 },
    { name: 'May', amount: 1800 },
    { name: 'Jun', amount: 1600 },
    { name: 'Jul', amount: 1750 },
    { name: 'Aug', amount: 1900 },
    { name: 'Sep', amount: 2100 },
    { name: 'Oct', amount: 1850 },
    { name: 'Nov', amount: 2000 },
    { name: 'Dec', amount: 2200 },
  ];
  
  const chartData = chartPeriod === 'weekly' ? weeklyChartData : monthlyChartData;
  
  return (
    <motion.div 
      className="max-w-5xl mx-auto pb-20 md:pb-0 md:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-crypto-text-secondary">Track your crypto assets and transactions</p>
        </motion.div>
        
        <BalanceCard 
          balance={balanceData.balance}
          currency={balanceData.currency}
          percentChange={balanceData.percentChange}
          tokens={balanceData.tokens}
        />
        
        <QuickActions />
        
        <PaymentButton />
        
        <TransactionList transactions={recentTransactions} />
        
        <SpendingChart 
          data={chartData}
          period={chartPeriod}
          onChangePeriod={setChartPeriod}
        />
      </div>
    </motion.div>
  );
};

export default Home;
