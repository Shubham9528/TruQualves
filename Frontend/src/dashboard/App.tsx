
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import DashboardView from './views/DashboardView';
import BlogsView from './views/BlogsView';
import UserManagementView from './views/UserManagementView';
import EventsView from './views/EventsView';
import type { ViewType } from './types';
import { ICONS } from './constants';

const PlaceholderView: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm px-6 text-center">
    <div className="bg-teal-50 p-6 rounded-3xl mb-6">
      <ICONS.Settings size={48} className="text-teal-600 opacity-50" />
    </div>
    <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md mx-auto">{description}</p>
    <button className="mt-8 bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-teal-500/20 hover:bg-teal-700 transition-all">
      Configuration Panel
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse on smaller desktop screens, close on mobile
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Blogs':
        return <BlogsView />;
      case 'Users':
        return <UserManagementView />;
      case 'Events':
        return <EventsView />;
      case 'Settings':
        return <PlaceholderView title="Account Settings" description="Manage your compliance profile, notification preferences, and API integration keys here." />;
      case 'Support':
        return <PlaceholderView title="Help & Support" description="Browse documentation or contact our specialized validation experts for technical assistance." />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Navigation */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      {/* 
        On desktop (lg), margin matches sidebar width (64 or 20).
        On mobile, margin is 0 because sidebar is an overlay.
      */}
      <div className={`flex-1 transition-all duration-300 min-w-0 
        ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Header activeView={activeView} toggleSidebar={toggleSidebar} />
        
        <main className={`p-4 md:p-8 w-full ${activeView === 'Events' ? 'max-w-none' : 'max-w-7xl mx-auto'}`}>
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
