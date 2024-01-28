import { type PropsWithChildren } from 'react';
import './[locale]/globals.css';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout = ({ children }: PropsWithChildren) => children;

export default RootLayout;
