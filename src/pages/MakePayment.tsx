
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Info, ScanQrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PaymentModal from '@/components/PaymentModal';
import QrScanner from '@/components/QrScanner';

const MakePayment = () => {
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showQrScanner, setShowQrScanner] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && walletAddress) {
      setIsModalOpen(true);
    }
  };
  
  const currencies = [
    { value: 'USD', label: 'USD - $' },
    { value: 'EUR', label: 'EUR - €' },
    { value: 'GBP', label: 'GBP - £' },
    { value: 'BTC', label: 'Bitcoin - ₿' },
    { value: 'ETH', label: 'Ethereum - Ξ' },
  ];
  
  const getCurrencySymbol = (currencyCode: string) => {
    const currencyMap: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'BTC': '₿',
      'ETH': 'Ξ',
    };
    return currencyMap[currencyCode] || currencyCode;
  };

  const handleQrCodeScanned = (result: string) => {
    setWalletAddress(result);
    setShowQrScanner(false);
  };
  
  return (
    <motion.div 
      className="max-w-5xl mx-auto pb-20 md:pb-0 md:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2 text-crypto-text-secondary hover:text-white"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Make Payment</h1>
        </div>
        
        {showQrScanner ? (
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Scan QR Code</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowQrScanner(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
            <QrScanner onScan={handleQrCodeScanned} />
          </motion.div>
        ) : (
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Recipient Wallet Address</Label>
                <div className="relative">
                  <Input 
                    id="wallet-address"
                    placeholder="Enter wallet address or search contacts"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="pl-10 bg-muted border-white/10"
                    required
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-crypto-text-secondary" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1.5"
                    onClick={() => setShowQrScanner(true)}
                  >
                    <ScanQrCode size={18} className="text-crypto-text-secondary hover:text-white" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 bg-muted border-white/10"
                      required
                    />
                    <div className="absolute left-3 top-2.5 text-crypto-text-primary">
                      {getCurrencySymbol(currency)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-muted border-white/10">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          {curr.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="memo" className="mr-2">Memo (Optional)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-crypto-text-secondary" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Add a note about this payment
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea 
                  id="memo"
                  placeholder="What's this payment for?"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="resize-none bg-muted border-white/10"
                />
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted mb-6">
                  <span className="text-crypto-text-secondary">Network Fee</span>
                  <span className="font-medium">{getCurrencySymbol(currency)}0.25</span>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-neon"
                >
                  Pay Now
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
      
      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={parseFloat(amount) || 0}
        currency={getCurrencySymbol(currency)}
        recipientAddress={walletAddress}
      />
    </motion.div>
  );
};

export default MakePayment;
