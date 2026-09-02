import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="nav container">
        <Link className="brand" href="/">
          <span>P</span>HOENIX
        </Link>
        <div className="nav-links">
          <Link href="/results">RESULTS</Link>
          <Link href="/stats">STATS</Link>
          <Link href="/players">PLAYERS</Link>
          <Link href="/about">ABOUT</Link>
        </div>
        <Link className="menu" href="/about">
          MENU <i />
        </Link>
      </nav>
    </header>
  );
}
