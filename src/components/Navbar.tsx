export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold">LOGO</div>
      <div className="flex gap-8 text-lg">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#study" className="hover:underline">Study</a>
      </div>
    </nav>
  );
}
