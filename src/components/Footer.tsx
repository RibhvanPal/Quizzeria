export default function Footer() {
  return (
    <footer className="bg-[#15F5BA] text-center p-10 shadow-inner mt-0">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Quiz App. All rights reserved.
      </p>
    </footer>
  );
}
