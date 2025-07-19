import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Clock, TrendingUp, Globe, Smartphone, Monitor } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface AnalyticsData {
  totalVisitors: number;
  pageViews: number;
  avgTimeOnSite: string;
  bounceRate: number;
  topPages: { page: string; views: number }[];
  deviceTypes: { type: string; percentage: number }[];
  countries: { country: string; visitors: number }[];
  dailyVisitors: { date: string; visitors: number }[];
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate analytics data - in production, this would come from your analytics service
    const mockData: AnalyticsData = {
      totalVisitors: 12847,
      pageViews: 28394,
      avgTimeOnSite: '3:42',
      bounceRate: 32.5,
      topPages: [
        { page: 'Home', views: 8234 },
        { page: 'Projects', views: 6789 },
        { page: 'About', views: 4521 },
        { page: 'Contact', views: 3456 },
        { page: 'Skills', views: 2890 }
      ],
      deviceTypes: [
        { type: 'Desktop', percentage: 58 },
        { type: 'Mobile', percentage: 35 },
        { type: 'Tablet', percentage: 7 }
      ],
      countries: [
        { country: 'United States', visitors: 4234 },
        { country: 'United Kingdom', visitors: 2156 },
        { country: 'Canada', visitors: 1876 },
        { country: 'Germany', visitors: 1543 },
        { country: 'Australia', visitors: 1234 }
      ],
      dailyVisitors: [
        { date: '2024-01-01', visitors: 234 },
        { date: '2024-01-02', visitors: 456 },
        { date: '2024-01-03', visitors: 345 },
        { date: '2024-01-04', visitors: 567 },
        { date: '2024-01-05', visitors: 432 },
        { date: '2024-01-06', visitors: 678 },
        { date: '2024-01-07', visitors: 543 }
      ]
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
    }, 1000);
  }, []);

  const StatCard: React.FC<{ 
    icon: React.ElementType; 
    title: string; 
    value: string | number; 
    change?: string;
    color: string;
  }> = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-green-500 text-sm font-medium flex items-center gap-1">
            <TrendingUp size={14} />
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
    </div>
  );

  if (!analyticsData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Portfolio performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Visitors"
          value={analyticsData.totalVisitors.toLocaleString()}
          change="+12.5%"
          color="bg-blue-500"
        />
        <StatCard
          icon={Eye}
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          change="+8.3%"
          color="bg-green-500"
        />
        <StatCard
          icon={Clock}
          title="Avg. Time on Site"
          value={analyticsData.avgTimeOnSite}
          change="+15.2%"
          color="bg-purple-500"
        />
        <StatCard
          icon={BarChart3}
          title="Bounce Rate"
          value={`${analyticsData.bounceRate}%`}
          change="-5.1%"
          color="bg-orange-500"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Pages</h3>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">{page.page}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Device Types</h3>
          <div className="space-y-4">
            {analyticsData.deviceTypes.map((device) => {
              const Icon = device.type === 'Desktop' ? Monitor : device.type === 'Mobile' ? Smartphone : Globe;
              return (
                <div key={device.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white font-medium">{device.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm w-10">{device.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Countries */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Countries</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {analyticsData.countries.map((country, index) => (
            <div key={country.country} className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                {index + 1}
              </div>
              <p className="text-gray-900 dark:text-white font-medium text-sm mb-1">{country.country}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{country.visitors.toLocaleString()} visitors</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;