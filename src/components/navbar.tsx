import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b-black border-b-2 p-2">
      <ul className="flex items-center gap-x-4">
        <li>
          <Link className="hover:text-sky-500 hover:underline" href="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="hover:text-sky-500 hover:underline" href="/notes">
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
