
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type QrScannerProps = {
  onScan: (result: string) => void;
};

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        setLoading(true);
        // Check if the navigator.mediaDevices API is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Your browser does not support camera access');
        }

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setLoading(false);
        }

        // Here we would typically initiate QR code scanning
        // For demonstration purposes, we'll use a timeout to simulate scanning
        // In a real implementation, you would use a library like jsQR or a dedicated QR scanner library
        setTimeout(() => {
          // Simulate finding a QR code
          const simulatedWalletAddress = '0x' + Math.random().toString(16).slice(2, 42);
          onScan(simulatedWalletAddress);
          
          // Stop the camera stream
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }, 3000);

      } catch (err) {
        console.error('Error accessing camera:', err);
        setError(err instanceof Error ? err.message : 'Failed to access camera');
        setLoading(false);
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <motion.div 
              className="absolute inset-0 border-2 border-primary rounded-lg"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-48 h-48 border-2 border-primary/70 rounded-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </>
        )}
      </div>
      <p className="mt-4 text-center text-sm text-crypto-text-secondary">
        {loading 
          ? "Accessing camera..." 
          : error 
            ? "Camera access failed" 
            : "Position the QR code within the frame to scan"
        }
      </p>
    </div>
  );
};

export default QrScanner;
