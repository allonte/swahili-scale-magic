import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Force favicon update
const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
if (favicon) {
  favicon.href = '/favicon.png';
} else {
  const newFavicon = document.createElement('link');
  newFavicon.rel = 'icon';
  newFavicon.href = '/favicon.png';
  document.head.appendChild(newFavicon);
}
createRoot(document.getElementById("root")!).render(<App />);
