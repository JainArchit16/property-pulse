import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

import { GlobalProvider } from '@/context/GlobalContext';
import '@/assets/styles/globals.css';

import 'photoswipe/dist/photoswipe.css';
import ToasterComponent from '@/components/Toaster';
import { SignupDataProvider } from '@/context/SignUpdata';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <SignupDataProvider>
        <AuthProvider>
          <html lang='en'>
            <head>
              <link rel='icon' href='/logo.png' />
            </head>
            <body>
              <ToasterComponent />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        </AuthProvider>
      </SignupDataProvider>
    </GlobalProvider>
  );
};
export default MainLayout;
