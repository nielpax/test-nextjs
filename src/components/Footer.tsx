export default function Footer() {
  return (
    <footer className="w-full border-t-[3px] border-primary border-dashed bg-background py-10 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p className="font-body text-lg md:text-xl opacity-80 mb-2">
          &copy; {new Date().getFullYear()} TeamKJ Official. Couples for Christ Community.
        </p>
        <p className="font-heading text-xl md:text-2xl text-accent font-bold -rotate-1 inline-block">
          One Voice, One Faith, One Family
        </p>
      </div>
    </footer>
  );
}
