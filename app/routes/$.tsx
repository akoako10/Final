import React from 'react';
import { useLocation } from 'react-router';

export default function CatchAll() {
  const location = useLocation();

  if (
    location.pathname.includes('.well-known') ||
    location.pathname.includes('chrome.devtools') ||
    location.pathname.includes('favicon.ico')
  ) {
    return new Response(null, { status: 404 });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);

  if (
    url.pathname.includes('.well-known') ||
    url.pathname.includes('chrome.devtools') ||
    url.pathname.includes('favicon.ico')
  ) {
    return new Response(null, { status: 404 });
  }

  return null;
}
