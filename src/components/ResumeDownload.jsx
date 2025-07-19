import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create a mock PDF download link
      const link = document.createElement('a');
      link.href = '#'; // Replace with actual PDF URL when available
      link.download = 'Augustine_Manu-Frimpong_Resume.pdf';
      document.body.appendChild(link);
      // link.click(); // Uncomment this when a real file URL is used
      document.body.removeChild(link);

      setDownloadComplete(true);

      // Reset after 3 seconds
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
