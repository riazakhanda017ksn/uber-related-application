import Link from "next/link";
import Image from "next/image";
import logo from "../../image/car.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Image src={logo} alt="Picture of the author" />
      </div>
      <div className="menu_bar">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/riders">
              <a>Dashboard</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
