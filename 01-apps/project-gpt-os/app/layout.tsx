import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project GPT OS',
  description: 'AI-native workspace for projects, prompts, knowledge and portfolio.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}