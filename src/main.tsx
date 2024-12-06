import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './App.tsx';
import './index.css';
import 'uplot/dist/uPlot.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { Analytics } from '@vercel/analytics/react';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          avatarBox: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          },
          userProfile: {
            avatarBox: {
              width: '80px',
              height: '80px',
            },
          },
          userButton: {
            avatarBox: {
              width: '40px',
              height: '40px',
            },
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Home />
        <Analytics />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
);
