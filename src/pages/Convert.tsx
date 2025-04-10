
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  icon: string;
  rate: number;
}

const Convert = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('BTC');
  const [toCurrency, setToCurrency] = useState<string>('ETH');
  const [amount, setAmount] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Sample currencies data
  const currencies: Currency[] = [
    { code: 'BTC', name: 'Bitcoin', symbol: '₿', icon: 'BTC', rate: 58962.45 },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', icon: 'ETH', rate: 3145.87 },
    { code: 'SOL', name: 'Solana', symbol: 'SOL', icon: 'SOL', rate: 172.34 },
    { code: 'USDT', name: 'Tether', symbol: '₮', icon: 'USDT', rate: 1.00 },
    { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', icon: 'BNB', rate: 575.62 },
  ];
  
  const getRate = (from: string, to: string) => {
    const fromCurr = currencies.find(c => c.code === from);
    const toCurr = currencies.find(c => c.code === to);
    
    if (!fromCurr || !toCurr) return 0;
    
    return toCurr.rate / fromCurr.rate;
  };
  
  const convertedAmount = () => {
    if (!amount) return '0';
    const rate = getRate(fromCurrency, toCurrency);
    const result = parseFloat(amount) * rate;
    return result.toFixed(6);
  };
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  const handleConvert = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsConverting(true);
    
    // Simulate conversion processing
    setTimeout(() => {
      setIsConverting(false);
      
      toast({
        title: "Conversion Successful",
        description: `${parseFloat(amount).toFixed(6)} ${fromCurrency} converted to ${convertedAmount()} ${toCurrency}`,
        variant: "default",
      });
    }, 1500);
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
          <h1 className="text-2xl font-semibold mb-4">Convert Currency</h1>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="from-currency">From</Label>
              <div className="flex space-x-4">
                <div className="w-2/5">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="bg-muted border-white/10">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{curr.symbol}</span>
                            {curr.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Input 
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-muted border-white/10"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                onClick={handleSwap}
                className="bg-muted p-3 rounded-full"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowDown size={20} className="text-crypto-text-secondary" />
              </motion.button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to-currency">To</Label>
              <div className="flex space-x-4">
                <div className="w-2/5">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-muted border-white/10">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{curr.symbol}</span>
                            {curr.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <div className="h-10 px-3 py-2 rounded-md bg-muted border border-white/10 flex items-center">
                    {convertedAmount()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-crypto-text-secondary">Exchange Rate</span>
                  <span>
                    1 {fromCurrency} = {getRate(fromCurrency, toCurrency).toFixed(6)} {toCurrency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crypto-text-secondary">Fee</span>
                  <span>0.5%</span>
                </div>
              </div>
              
              <Button 
                onClick={handleConvert}
                disabled={!amount || parseFloat(amount) <= 0 || isConverting}
                className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-neon flex items-center justify-center"
              >
                {isConverting ? (
                  <>
                    <RefreshCw size={18} className="mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert Now'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base font-semibold mb-4">Live Exchange Rates</h3>
          
          <div className="space-y-3">
            {currencies.map((curr, index) => (
              <motion.div 
                key={curr.code}
                className="flex justify-between items-center p-3 rounded-lg bg-muted"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index % 3 === 0 ? 'bg-primary/20 text-primary' : 
                    index % 3 === 1 ? 'bg-secondary/20 text-secondary' : 
                    'bg-accent/20 text-accent'
                  }`}>
                    {curr.symbol}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">{curr.name}</div>
                    <div className="text-xs text-crypto-text-secondary">{curr.code}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">${curr.rate.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Convert;
