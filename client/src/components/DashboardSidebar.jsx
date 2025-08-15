import React from 'react';

const DashboardSidebar = ({ links, title = 'Dashboard', open = true, onClose }) => {
  return (
    <aside
      className={`bg-white border-r h-full min-h-screen flex flex-col transition-all duration-200 w-64 fixed z-40 top-0 left-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 lg:static
        shadow-lg lg:shadow-none
      `}
      style={{ maxWidth: 256 }}
    >
      <div className="flex items-center gap-2 p-4 border-b justify-between">
        <span className="font-bold text-xl text-primary">{title}</span>
        {/* Close button for mobile */}
        <button
          className="lg:hidden text-gray-500 hover:text-primary text-2xl px-2"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-1 mt-4">
        {links.map(link => (
          link.onClick ? (
            <button
              key={link.label}
              onClick={e => {
                link.onClick(e);
                if (onClose) onClose();
              }}
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
              onClick={onClose}
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