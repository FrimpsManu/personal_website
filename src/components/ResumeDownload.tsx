import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';

const ResumeDownload: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    try {
      // In a real application, you would fetch the actual PDF file
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock PDF download
      const link = document.createElement('a');
      link.href = '#'; // In production, this would be the actual PDF URL
      link.download = 'Augustine_Manu-Frimpong_Resume.pdf';
      document.body.appendChild(link);
      // link.click(); // Uncomment when you have an actual PDF
      document.body.removeChild(link);
      
      setDownloadComplete(true);
      
      // Reset state after 3 seconds
      setTimeout(() => {
        setDownloadComplete(false);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed hover:-translate-y-1 disabled:transform-none"
    >
      {isDownloading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Preparing...
        </>
      ) : downloadComplete ? (
        <>
          <CheckCircle size={20} />
          Downloaded!
        </>
      ) : (
        <>
          <Download size={20} />
          Download Resume
        </>
      )}
    </button>
  );
};

export default ResumeDownload;