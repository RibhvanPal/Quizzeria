export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 shadow-inner mt-12">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Quiz App. All rights reserved.
      </p>
    </footer>
  );
}
