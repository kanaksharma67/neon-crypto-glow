
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  recipientAddress: string;
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency,
  recipientAddress
}) => {
  const [stage, setStage] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const { toast } = useToast();
  
  const handleConfirm = () => {
    setStage('processing');
    
    // Simulate processing time
    setTimeout(() => {
      setStage('success');
      
      // Show a toast notification
      toast({
        title: "Payment Successful",
        description: `${currency}${amount} was sent successfully`,
        variant: "default",
      });
    }, 2000);
  };
  
  const handleClose = () => {
    if (stage === 'success') {
      setStage('confirm');
    }
    onClose();
  };
  
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-white/10 p-0 overflow-hidden sm:max-w-md">
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-crypto-text-secondary hover:text-white focus:outline-none"
        >
          <X size={18} />
        </button>
        
        <AnimatePresence mode="wait">
          {stage === 'confirm' && (
            <motion.div 
              className="p-6"
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-center">Confirm Payment</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="text-crypto-text-secondary">Amount</span>
                  <span className="font-medium">{currency}{amount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="text-crypto-text-secondary">Recipient</span>
                  <span className="font-medium">{truncateAddress(recipientAddress)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="text-crypto-text-secondary">Network Fee</span>
                  <span className="font-medium">{currency}0.25</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <Button 
                  onClick={handleConfirm}
                  className="bg-primary hover:bg-primary/90 text-white py-5 px-10 rounded-xl w-full shadow-neon"
                >
                  Confirm Payment
                </Button>
              </div>
            </motion.div>
          )}
          
          {stage === 'processing' && (
            <motion.div 
              className="p-6 flex flex-col items-center justify-center"
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ minHeight: '16rem' }}
            >
              <Loader2 size={48} className="text-primary animate-spin mb-4" />
              <h3 className="text-xl font-semibold">Processing Payment</h3>
              <p className="text-crypto-text-secondary mt-2">
                Please wait while we process your transaction...
              </p>
            </motion.div>
          )}
          
          {stage === 'success' && (
            <motion.div 
              className="p-6 flex flex-col items-center justify-center"
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ minHeight: '16rem' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle size={48} className="text-crypto-success mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold">Payment Successful!</h3>
              <p className="text-crypto-text-secondary mt-2 mb-6 text-center">
                Your transaction of {currency}{amount} has been sent successfully.
              </p>
              <Button 
                onClick={handleClose}
                className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-xl"
              >
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
