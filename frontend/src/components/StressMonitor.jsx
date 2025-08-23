import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FaRegClock, FaExclamationTriangle, FaDesktop, FaCode, FaGithub, FaPalette, FaGlobe } from "react-icons/fa";
import { logScreenTime, getTodayScreenTime } from '../services/screentime';

// Enhanced backend API calls with real screen time integration
const mockAPI = {
  async getStressData() {
    // Get real screen time data using the imported function
    const screenTimeData = await getTodayScreenTime();
    
    // Simulate other stress factors (these would be real API calls in production)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      overdueTasks: Math.floor(Math.random() * 8),
      missedDeadlines: Math.floor(Math.random() * 4),
      screenTimeHours: screenTimeData.totalHours || screenTimeData,
      appUsage: screenTimeData.apps || {
        'VS Code': screenTimeData * 0.3,
        'Vercel': screenTimeData * 0.2,
        'Canva': screenTimeData * 0.15,
        'GitHub': screenTimeData * 0.25
      },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
  },

  async logStressData(stressData) {
    // Log stress data to backend
    console.log('Logging stress data:', stressData);
    return { success: true };
  }
};

// Enhanced color function with smoother transitions
function getColor(score) {
  if (score < 30) return '#10b981'; // emerald-500 (healthy)
  if (score < 50) return '#22c55e'; // green-500 (good)
  if (score < 70) return '#facc15'; // yellow-400 (moderate)
  if (score < 85) return '#f97316'; // orange-500 (high)
  return '#ef4444'; // red-500 (critical)
}

// Get stress level text
function getStressLevel(score) {
  if (score < 30) return 'Healthy';
  if (score < 50) return 'Good';
  if (score < 70) return 'Moderate';
  if (score < 85) return 'High';
  return 'Critical';
}

// Enhanced Circular Progress with animations
function CircularProgress({ value, size = 140, stroke = 14 }) {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeSize = typeof size === 'number' && !isNaN(size) ? size : 140;
  const safeStroke = typeof stroke === 'number' && !isNaN(stroke) ? stroke : 14;

  const radius = (safeSize - safeStroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (safeValue / 100) * circ;
  const color = getColor(safeValue);

  // Optional: Fallback in case offset is NaN
  const strokeDashoffset = isNaN(offset) ? '0' : offset;

  return (
    <div className="relative">
      <svg width={safeSize} height={safeSize} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={safeStroke}
          fill="none"
          opacity="0.3"
        />
        {/* Progress circle */}
        <circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke={color}
          strokeWidth={safeStroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          filter="drop-shadow(0 0 8px rgba(255,255,255,0.3))"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-3xl font-bold transition-colors duration-500"
          style={{ color }}
        >
          {safeValue}%
        </span>
        <span 
          className="text-xs font-medium mt-1 transition-colors duration-500"
          style={{ color }}
        >
          {getStressLevel(safeValue)}
        </span>
      </div>
    </div>
  );
}

// Component breakdown card
function StressComponent({
  icon: Icon,
  label,
  value = 0,
  weight = 0,
  raw,
  maxValue,
  unit = ''
}) {
  const percentage = Math.round(value);
  const color = getColor(value);

  return (
    <div className="p-3 rounded-lg border" style={{ backgroundColor: 'rgba(55,65,81,0.5)', borderColor: '#4B5563' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-400" />}
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
        </div>
        <span className="text-xs text-gray-400">{weight}%</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">
            {typeof raw === 'number' ? `${raw.toFixed(1)}${unit}` : String(raw || '')}
          </span>
          <span className="text-sm font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>

        <div className="w-full rounded-full h-1.5 bg-gray-600">
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {maxValue !== undefined && (
          <div className="text-xs text-gray-500">
            Max: {maxValue}{unit}
          </div>
        )}
      </div>
    </div>
  );
}

// Screen Time Tracker Hook
function useScreenTimeTracker() {
  const sessionStartTime = useRef(Date.now());
  const lastLogTime = useRef(Date.now());
  const currentApp = useRef('Browser'); // Default app
  
  // Log screen time periodically using the real logScreenTime function
  useEffect(() => {
    const logInterval = setInterval(async () => {
      const now = Date.now();
      const duration = Math.round((now - lastLogTime.current) / (1000 * 60)); // minutes
      
      if (duration > 0) {
        try {
          await logScreenTime(currentApp.current, duration);
          lastLogTime.current = now;
        } catch (error) {
          console.error('Error logging screen time:', error);
        }
      }
    }, 60000); // Log every minute
    
    return () => clearInterval(logInterval);
  }, []);
  
  // Log on window focus/blur
  useEffect(() => {
    const handleVisibilityChange = async () => {
      const now = Date.now();
      const duration = Math.round((now - lastLogTime.current) / (1000 * 60));
      
      if (document.hidden && duration > 0) {
        // Page is hidden, log current session
        try {
          await logScreenTime(currentApp.current, duration);
          lastLogTime.current = now;
        } catch (error) {
          console.error('Error logging screen time on visibility change:', error);
        }
      } else if (!document.hidden) {
        // Page is visible again, reset timer
        lastLogTime.current = now;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  // Detect active application (simplified)
  useEffect(() => {
    const detectActiveApp = () => {
      const hostname = window.location.hostname;
      if (hostname.includes('github')) currentApp.current = 'GitHub';
      else if (hostname.includes('vercel')) currentApp.current = 'Vercel';
      else if (hostname.includes('canva')) currentApp.current = 'Canva';
      else if (hostname.includes('vscode') || hostname.includes('code')) currentApp.current = 'VS Code';
      else currentApp.current = 'Browser';
    };
    
    detectActiveApp();
  }, []);
  
  return { currentApp: currentApp.current };
}

// Main Smart Stress Monitor Component
export default function SmartStressMonitor() {
  const [stressData, setStressData] = useState({
    overdueTasks: 0,
    missedDeadlines: 0,
    screenTimeHours: 0,
    appUsage: {},
    lastUpdated: null
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  
  // Use screen time tracker
  const { currentApp } = useScreenTimeTracker();

  // Enhanced thresholds
  const THRESHOLDS = {
    OVERDUE_MAX: 5,
    MISSED_MAX: 3,
    SCREEN_MAX: 8, // hours
    APP_MAX: 6 // hours
  };

  const APPS = [
    { name: 'VS Code', icon: FaCode },
    { name: 'Vercel', icon: FaGlobe },
    { name: 'Canva', icon: FaPalette },
    { name: 'GitHub', icon: FaGithub }
  ];

  // Calculate stress components
  const calculateStress = useCallback((data) => {
    const overdueStress = Math.min((data.overdueTasks / THRESHOLDS.OVERDUE_MAX) * 100, 100);
    const missedStress = Math.min((data.missedDeadlines / THRESHOLDS.MISSED_MAX) * 100, 100);
    const screenStress = Math.min((data.screenTimeHours / THRESHOLDS.SCREEN_MAX) * 100, 100);
    
    const totalAppUsage = APPS.reduce((sum, app) => sum + (data.appUsage[app.name] || 0), 0);
    const appStress = Math.min((totalAppUsage / THRESHOLDS.APP_MAX) * 100, 100);

    // Weighted calculation
    const totalStress = Math.round(
      overdueStress * 0.2 +
      missedStress * 0.1 +
      screenStress * 0.5 +
      appStress * 0.2
    );

    return {
      total: totalStress,
      components: {
        overdue: overdueStress,
        missed: missedStress,
        screen: screenStress,
        app: appStress
      }
    };
  }, []);

  // Fetch stress data with real screen time
  const fetchStressData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Get real stress data (including screen time from getTodayScreenTime)
      const data = await mockAPI.getStressData();
      setStressData(data);
      
      // Calculate and log stress
      const stressCalc = calculateStress(data);
      await mockAPI.logStressData({
        ...data,
        stressScore: stressCalc.total,
        timestamp: new Date().toISOString(),
        currentApp: currentApp
      });
      
      // Update historical data (keep last 24 hours)
      setHistoricalData(prev => {
        const newEntry = {
          timestamp: Date.now(),
          stress: stressCalc.total,
          screenTime: data.screenTimeHours
        };
        return [...prev.slice(-23), newEntry]; // Keep last 24 entries
      });
      
    } catch (error) {
      console.error('Failed to fetch stress data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateStress, currentApp]);

  // Real-time updates every 5 minutes
  useEffect(() => {
    fetchStressData();
    const interval = setInterval(fetchStressData, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [fetchStressData]);

  // Manual refresh function
  const handleRefresh = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchStressData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, [fetchStressData]);

  // Calculate current stress
  const stressCalc = calculateStress(stressData);
  const { total: totalStress, components } = stressCalc;

  // Breakdown data for components
  const breakdownData = [
    {
      icon: FaExclamationTriangle,
      label: 'Overdue Tasks',
      value: components.overdue,
      weight: 20,
      raw: stressData.overdueTasks,
      maxValue: THRESHOLDS.OVERDUE_MAX
    },
    {
      icon: FaRegClock,
      label: 'Missed Deadlines',
      value: components.missed,
      weight: 10,
      raw: stressData.missedDeadlines,
      maxValue: THRESHOLDS.MISSED_MAX
    },
    {
      icon: FaDesktop,
      label: 'Screen Time',
      value: components.screen,
      weight: 50,
      raw: stressData.screenTimeHours,
      maxValue: THRESHOLDS.SCREEN_MAX,
      unit: 'h'
    },
    {
      icon: FaCode,
      label: 'App Usage',
      value: components.app,
      weight: 20,
      raw: APPS.map(app => `${app.name}: ${(stressData.appUsage[app.name] || 0).toFixed(1)}h`).join(', '),
      maxValue: THRESHOLDS.APP_MAX,
      unit: 'h'
    }
  ];

  if (isLoading && !stressData.lastUpdated) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading stress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaRegClock className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold text-white">Smart Stress Monitor</h2>
          <div className="flex items-center gap-2 ml-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">Live Tracking</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">
            Last Updated
          </div>
          <div className="text-sm text-gray-300 font-medium">
            {stressData.lastUpdated || 'Never'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Active: {currentApp}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Refreshing...
            </>
          ) : (
            'Refresh Data'
          )}
        </button>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Circular Progress */}
        <div className="flex flex-col items-center">
          <CircularProgress value={totalStress} />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Current Stress Level
            </p>
            <div className="flex items-center justify-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(totalStress) }}
              />
              <span 
                className="text-lg font-bold"
                style={{ color: getColor(totalStress) }}
              >
                {getStressLevel(totalStress)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
          >
            {showBreakdown ? 'Hide' : 'Show'} Breakdown
          </button>
        </div>

        {/* Breakdown Components */}
        {showBreakdown && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Stress Components</h3>
            {breakdownData.map((item, index) => (
              <StressComponent key={index} {...item} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/30 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{stressData.overdueTasks}</div>
          <div className="text-xs text-gray-400">Overdue Tasks</div>
        </div>
        <div className="bg-gray-700/30 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">{stressData.missedDeadlines}</div>
          <div className="text-xs text-gray-400">Missed Deadlines</div>
        </div>
        <div className="bg-gray-700/30 p-3 rounded-lg text-center">
         <div className="text-2xl font-bold text-white">
  {typeof stressData.screenTimeHours === 'number'
    ? stressData.screenTimeHours.toFixed(1)
    : '0.0'}h
</div>

          <div className="text-xs text-gray-400">Screen Time Today</div>
        </div>
        <div className="bg-gray-700/30 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-white">
            {(() => {
  const total = APPS.reduce((sum, app) => {
    const usage = stressData.appUsage[app.name];
    return sum + (typeof usage === 'number' ? usage : 0);
  }, 0);
  return total.toFixed(1);
})()}h

          </div>
          <div className="text-xs text-gray-400">App Usage</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          Live screen time tracking enabled. Data updates every 5 minutes with real-time logging.
          <br />
          Green (0-50%): Healthy | Yellow (50-70%): Moderate | Red (70-100%): High Stress
        </div>
      </div>
    </div>
  );
}