import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Header from '@/app/components/Header';
import HeroGallery from '@/app/components/HeroGallery';
import MiddleBar from '@/app/components/MiddleBar';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/app/components/BackgroundWrapper';
import HapticsInitializer from '@/app/components/HapticsInitializer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'sr'
    ? 'Aca Jankovic - Premium Slot Iskustvo'
    : 'Aca Jankovic - Premium Slots Experience';

  const description = locale === 'sr'
    ? 'Otkrijte ekskluzivne bonuse i turnire. Pridružite se najboljem online kazino iskustvu.'
    : 'Discover exclusive bonuses and tournaments. Join the ultimate online casino experience.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'sr' ? 'sr_RS' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as 'en' | 'sr')) {
    notFound();
  }

  // Fetch messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <HapticsInitializer />
          <BackgroundWrapper>
            <div className="min-h-screen">
              {/* PERSISTENT - Header */}
              <Header />

              {/* PERSISTENT - Hero Carousel */}
              <HeroGallery />

              {/* PERSISTENT - Middle Navigation Bar */}
              <MiddleBar />

              {/* DYNAMIC - Page Content */}
              <main>{children}</main>

              {/* PERSISTENT - Footer */}
              <Footer />
            </div>
          </BackgroundWrapper>
          <Toaster position="bottom-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
