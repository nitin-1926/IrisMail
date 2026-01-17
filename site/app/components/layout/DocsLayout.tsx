'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="mx-auto flex w-full max-w-6xl flex-1 px-6">
        <Sidebar />
        
        <main className="min-w-0 flex-1 py-8 lg:pl-8">
          <article className="max-w-3xl">
            {children}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
