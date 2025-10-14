import { RedirectType } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Redirecting...'
  };
}

export default function RootPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/en';
  }

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: 'window.location.href = "/en";' }} />
      </body>
    </html>
  );
}
