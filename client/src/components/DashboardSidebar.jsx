import React from 'react';

const DashboardSidebar = ({ links, title = 'Dashboard' }) => {
  return (
    <aside className={`bg-white border-r h-full min-h-screen flex flex-col transition-all duration-200 w-20 lg:w-64 fixed z-40`}>
      <div className="flex items-center gap-2 p-4 border-b">
        <span className="font-bold text-xl text-primary">{title}</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1 mt-4">
        {links.map(link => (
          link.onClick ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition font-medium group w-full text-left ${link.isActive ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'}`}
              title={link.label}
            >
              {link.icon}
              <span className="hidden lg:inline">{link.label}</span>
            </button>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg transition font-medium group w-full text-left ${link.isActive ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'}`}
              title={link.label}
            >
              {link.icon}
              <span className="hidden lg:inline">{link.label}</span>
            </a>
          )
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;