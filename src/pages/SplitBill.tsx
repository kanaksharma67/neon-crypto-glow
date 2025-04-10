
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Users, SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface Person {
  id: string;
  name: string;
  percentage: number;
  amount: number;
}

const SplitBill = () => {
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'You', percentage: 50, amount: 0 },
    { id: '2', name: 'Friend', percentage: 50, amount: 0 },
  ]);
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();
  
  const addPerson = () => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: `Person ${people.length + 1}`,
      percentage: 0,
      amount: 0,
    };
    
    const newPeople = [...people, newPerson];
    updatePercentages(newPeople, splitType);
  };
  
  const removePerson = (id: string) => {
    if (people.length <= 2) return;
    
    const newPeople = people.filter(person => person.id !== id);
    updatePercentages(newPeople, splitType);
  };
  
  const updatePercentages = (peopleArray: Person[], type: 'equal' | 'custom') => {
    const newPeople = [...peopleArray];
    
    if (type === 'equal') {
      const equalPercentage = 100 / newPeople.length;
      newPeople.forEach(person => {
        person.percentage = equalPercentage;
        person.amount = totalAmount ? parseFloat(totalAmount) * (equalPercentage / 100) : 0;
      });
    } else {
      // For custom, recalculate to ensure total is 100%
      const total = newPeople.reduce((acc, p) => acc + p.percentage, 0);
      if (total > 0) {
        newPeople.forEach(person => {
          person.percentage = (person.percentage / total) * 100;
          person.amount = totalAmount ? parseFloat(totalAmount) * (person.percentage / 100) : 0;
        });
      } else {
        // If all percentages are 0, distribute equally
        const equalPercentage = 100 / newPeople.length;
        newPeople.forEach(person => {
          person.percentage = equalPercentage;
          person.amount = totalAmount ? parseFloat(totalAmount) * (equalPercentage / 100) : 0;
        });
      }
    }
    
    setPeople(newPeople);
  };
  
  const handleSplitTypeChange = (value: 'equal' | 'custom') => {
    setSplitType(value);
    updatePercentages(people, value);
  };
  
  const handleTotalAmountChange = (value: string) => {
    setTotalAmount(value);
    
    const amount = parseFloat(value) || 0;
    const newPeople = people.map(person => ({
      ...person,
      amount: amount * (person.percentage / 100),
    }));
    
    setPeople(newPeople);
  };
  
  const handleSliderChange = (personId: string, value: number[]) => {
    const percentage = value[0];
    
    const newPeople = people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          percentage,
          amount: totalAmount ? parseFloat(totalAmount) * (percentage / 100) : 0,
        };
      }
      return person;
    });
    
    // Adjust other percentages to ensure total is 100%
    const selectedPerson = newPeople.find(p => p.id === personId);
    if (!selectedPerson) return;
    
    const otherPeople = newPeople.filter(p => p.id !== personId);
    const otherTotal = otherPeople.reduce((acc, p) => acc + p.percentage, 0);
    
    if (otherTotal > 0) {
      const remainingPercentage = 100 - selectedPerson.percentage;
      const multiplier = remainingPercentage / otherTotal;
      
      otherPeople.forEach(person => {
        person.percentage = person.percentage * multiplier;
        person.amount = totalAmount ? parseFloat(totalAmount) * (person.percentage / 100) : 0;
      });
    }
    
    setPeople(newPeople);
  };
  
  const handleNameChange = (personId: string, name: string) => {
    setPeople(prev => 
      prev.map(person => 
        person.id === personId ? { ...person, name } : person
      )
    );
  };
  
  const handleSendRequest = () => {
    if (!totalAmount || parseFloat(totalAmount) <= 0) return;
    
    setIsLoading(true);
    
    // Simulate sending request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Split Request Sent",
        description: `Bill split request for $${totalAmount} has been sent`,
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
          <h1 className="text-2xl font-semibold mb-4">Split a Bill</h1>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="total-amount">Total Amount</Label>
              <div className="relative">
                <Input 
                  id="total-amount"
                  type="number"
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => handleTotalAmountChange(e.target.value)}
                  className="pl-8 bg-muted border-white/10"
                />
                <div className="absolute left-3 top-2.5 text-crypto-text-primary">
                  $
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description"
                placeholder="e.g. Dinner at Italian Restaurant"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-muted border-white/10"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Split Type</Label>
              </div>
              
              <RadioGroup 
                value={splitType} 
                onValueChange={(value) => handleSplitTypeChange(value as 'equal' | 'custom')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equal" id="equal" />
                  <Label htmlFor="equal">Equal Split</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom Split</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>People</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPerson}
                  className="border-white/10 bg-muted"
                >
                  <Plus size={16} className="mr-1" />
                  Add Person
                </Button>
              </div>
              
              {people.map((person, index) => (
                <motion.div 
                  key={person.id}
                  className="p-4 rounded-lg bg-muted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      <Input 
                        value={person.name}
                        onChange={(e) => handleNameChange(person.id, e.target.value)}
                        className="bg-crypto-card/60 border-white/10 h-8 text-sm"
                      />
                    </div>
                    {index > 0 && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removePerson(person.id)}
                        className="h-8 w-8 text-crypto-error"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {splitType === 'custom' && (
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[person.percentage]}
                          onValueChange={(value) => handleSliderChange(person.id, value)}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <div className="text-sm font-medium w-14 text-right">
                          {Math.round(person.percentage)}%
                        </div>
                      </div>
                    )}
                    
                    <div className="text-right text-sm">
                      <span className="text-crypto-text-secondary mr-2">Amount:</span>
                      <span className="font-medium">
                        ${person.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button 
              onClick={handleSendRequest}
              disabled={!totalAmount || parseFloat(totalAmount) <= 0 || isLoading}
              className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-neon flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Users size={18} className="mr-2 animate-pulse" />
                  Sending Request...
                </>
              ) : (
                <>
                  <SendHorizontal size={18} className="mr-2" />
                  Send Split Request
                </>
              )}
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-base font-semibold mb-4">Split Summary</h3>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-crypto-text-secondary">Total Amount</span>
              <span className="font-medium">
                ${totalAmount ? parseFloat(totalAmount).toFixed(2) : '0.00'}
              </span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-crypto-text-secondary">Split Type</span>
              <span>{splitType === 'equal' ? 'Equal Split' : 'Custom Split'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-crypto-text-secondary">Number of People</span>
              <span>{people.length}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {people.map((person, index) => (
              <div 
                key={person.id} 
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                    index % 3 === 0 ? 'bg-primary/20 text-primary' : 
                    index % 3 === 1 ? 'bg-secondary/20 text-secondary' : 
                    'bg-accent/20 text-accent'
                  }`}>
                    {person.name.charAt(0)}
                  </div>
                  <span>{person.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ${person.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-crypto-text-secondary">
                    {Math.round(person.percentage)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplitBill;
