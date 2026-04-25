import Link from "next/link";

export const metadata = {
  title: "Offline | TeamKJ",
  description: "You are currently offline.",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border max-w-md w-full">
        <h1 className="text-4xl font-kalam font-bold mb-4 text-primary">You are offline</h1>
        <p className="text-muted-foreground mb-8 text-lg font-body">
          Please check your internet connection and try again. Don't worry, some parts of the app may still be available from your cache!
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
