const results = [
  { date: "08.18", opponent: "BLUE WINGS", score: "8 - 3", result: "WIN" },
  { date: "08.04", opponent: "TOKYO BATS", score: "4 - 6", result: "LOSE" },
  { date: "07.21", opponent: "NORTH STARS", score: "11 - 2", result: "WIN" },
];

const batting = [
  ["#10", "TAKUMI", ".438", "12", "9"],
  ["#7", "YUTO", ".375", "8", "6"],
  ["#1", "RYO", ".353", "10", "4"],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav container">
          <a className="brand" href="#top"><span>P</span>HOENIX</a>
          <div className="nav-links">
            <a href="#results">RESULTS</a><a href="#stats">STATS</a><a href="#about">ABOUT</a>
          </div>
          <a className="menu" href="#about" aria-label="メニューを開く">MENU <i /></a>
        </nav>
        <div className="hero-content container">
          <p className="eyebrow">BASEBALL CLUB / EST. 2024</p>
          <h1>RISE<br /><em>TOGETHER.</em></h1>
          <p className="hero-copy">一球に、想いを。<br />PHOENIXは仲間と挑み、勝利を目指す野球チームです。</p>
          <a className="button" href="#results">試合結果を見る <b>→</b></a>
        </div>
        <div className="hero-number">P</div>
        <div className="diamond"><span /><span /><span /><span /></div>
      </section>

      <section className="season container" id="results">
        <div className="section-heading">
          <div><p className="eyebrow">2026 SEASON</p><h2>GAME RESULTS</h2></div>
          <a href="#all-results">ALL RESULTS <b>→</b></a>
        </div>
        <div className="record-row">
          <div className="record"><strong>12</strong><span>WINS</span></div>
          <div className="record"><strong>5</strong><span>LOSES</span></div>
          <div className="record"><strong>.706</strong><span>WIN PCT</span></div>
          <p>現在リーグ<br /><b>2位</b></p>
        </div>
        <div className="results-grid">
          {results.map((game) => <article className="game" key={game.date}>
            <div><time>2026.{game.date}</time><span className={game.result.toLowerCase()}>{game.result}</span></div>
            <h3>PHOENIX <small>vs</small> {game.opponent}</h3>
            <strong>{game.score}</strong>
          </article>)}
        </div>
      </section>

      <section className="stats" id="stats">
        <div className="container stats-inner">
          <div className="stats-title"><p className="eyebrow">2026 SEASON</p><h2>TEAM<br /><em>STATS.</em></h2><p>選手たちの記録と、チームの軌跡。</p><a className="button light" href="#all-stats">成績一覧へ <b>→</b></a></div>
          <div className="stat-cards">
            <article><span>TEAM BATTING AVG.</span><strong>.312</strong><small>リーグ平均 .271</small></article>
            <article><span>TEAM ERA</span><strong>2.84</strong><small>リーグ平均 3.46</small></article>
            <article><span>HOME RUNS</span><strong>18</strong><small>リーグ 3位</small></article>
          </div>
        </div>
      </section>

      <section className="leaders container">
        <div className="section-heading"><div><p className="eyebrow">LEAGUE LEADERS</p><h2>BATTING LEADERS</h2></div><a href="#all-stats">VIEW STATS <b>→</b></a></div>
        <div className="leader-table">
          <div className="table-head"><span>PLAYER</span><span>AVG</span><span>H</span><span>RBI</span></div>
          {batting.map((player) => <div className="table-row" key={player[0]}><span><b>{player[0]}</b> {player[1]}</span><strong>{player[2]}</strong><span>{player[3]}</span><span>{player[4]}</span></div>)}
        </div>
      </section>

      <section className="about" id="about"><div className="container about-inner"><p className="eyebrow">ABOUT PHOENIX</p><h2>WE PLAY<br />AS <em>ONE.</em></h2><p>野球を愛する仲間が集まり、ひとつのチームになる。<br />勝つことを楽しみ、挑戦することを誇りに思う。</p><a href="#contact">チームについて <b>→</b></a></div></section>
      <footer className="container"><a className="brand" href="#top"><span>P</span>HOENIX</a><p>© 2026 PHOENIX BASEBALL CLUB</p><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}

