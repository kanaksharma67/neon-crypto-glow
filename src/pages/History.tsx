
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter, ArrowDownUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from '@/components/TransactionList';
import TransactionList from '@/components/TransactionList';

const History = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Sample transactions data
  const allTransactions: Transaction[] = [
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
    {
      id: '5',
      type: 'sent',
      title: 'To Sarah Johnson',
      amount: 75.00,
      currency: '$',
      date: new Date('2025-04-01'),
      status: 'completed',
    },
    {
      id: '6',
      type: 'received',
      title: 'From Mike Thompson',
      amount: 360.25,
      currency: '$',
      date: new Date('2025-03-28'),
      status: 'completed',
    },
    {
      id: '7',
      type: 'converted',
      title: 'ETH to SOL',
      amount: 295.50,
      currency: '$',
      date: new Date('2025-03-25'),
      status: 'failed',
    },
    {
      id: '8',
      type: 'split',
      title: 'Movie tickets',
      amount: 32.80,
      currency: '$',
      date: new Date('2025-03-20'),
      status: 'completed',
    },
  ];
  
  const sentTransactions = allTransactions.filter(tx => tx.type === 'sent');
  const receivedTransactions = allTransactions.filter(tx => tx.type === 'received');
  const convertedTransactions = allTransactions.filter(tx => tx.type === 'converted');
  const splitTransactions = allTransactions.filter(tx => tx.type === 'split');
  
  // Filter transactions based on search query
  const filterTransactions = (transactions: Transaction[]) => {
    if (!searchQuery) return transactions;
    
    return transactions.filter(tx => 
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery)
    );
  };
  
  // Get transactions based on active tab
  const getTabTransactions = () => {
    switch (activeTab) {
      case 'sent':
        return filterTransactions(sentTransactions);
      case 'received':
        return filterTransactions(receivedTransactions);
      case 'converted':
        return filterTransactions(convertedTransactions);
      case 'split':
        return filterTransactions(splitTransactions);
      default:
        return filterTransactions(allTransactions);
    }
  };
  
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
          <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Input 
              placeholder="Search transactions" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-white/10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-crypto-text-secondary" />
          </div>
          
          <Button variant="outline" size="icon" className="border-white/10">
            <Calendar size={18} />
          </Button>
          
          <Button variant="outline" size="icon" className="border-white/10">
            <Filter size={18} />
          </Button>
          
          <Button variant="outline" size="icon" className="border-white/10">
            <ArrowDownUp size={18} />
          </Button>
        </motion.div>
        
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6 bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
              <TabsTrigger value="split">Split</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <TransactionList transactions={getTabTransactions()} showViewAll={false} />
            </TabsContent>
            
            <TabsContent value="sent" className="mt-0">
              <TransactionList transactions={getTabTransactions()} showViewAll={false} />
            </TabsContent>
            
            <TabsContent value="received" className="mt-0">
              <TransactionList transactions={getTabTransactions()} showViewAll={false} />
            </TabsContent>
            
            <TabsContent value="converted" className="mt-0">
              <TransactionList transactions={getTabTransactions()} showViewAll={false} />
            </TabsContent>
            
            <TabsContent value="split" className="mt-0">
              <TransactionList transactions={getTabTransactions()} showViewAll={false} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default History;
