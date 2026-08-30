import { getTeamData } from "../../lib/sheets";

export const revalidate = 3600;

export default async function PlayersPage() {
  const { members, updated } = await getTeamData();

  return (
    <main className="inner-page">
      <header className="inner-header container">
        <a className="brand" href="/">
          <span>P</span>HOENIX
        </a>
        <a href="/stats">STATS →</a>
      </header>
      <section className="container page-title">
        <p className="eyebrow">2026 SEASON {updated && "/ LIVE DATA"}</p>
        <h1>
          OUR
          <br />
          <em>PLAYERS.</em>
        </h1>
        <p>PHOENIXで戦う選手たち。選手のプロフィールはメンバーシートから更新されます。</p>
      </section>
      <section className="container roster-section">
        <div className="roster-heading">
          <p className="eyebrow">TEAM ROSTER</p>
          <p>{members.length} PLAYERS</p>
        </div>
        {members.length > 0 ? (
          <div className="roster-grid">
            {members.map((member) => (
              <a
                className="player-card"
                href={`/players/${encodeURIComponent(member.number.replace(/^#/, ""))}`}
                key={member.id}
              >
                {member.imageUrl !== "—" ? (
                  <img
                    alt={`${member.name}の写真`}
                    className="player-photo"
                    src={member.imageUrl}
                  />
                ) : (
                  <span className="player-no-image">NO IMAGE</span>
                )}
                <div className="player-card-content">
                  <span className="player-number">{member.number}</span>
                  <p>{member.position === "—" ? "" : member.position}</p>
                  <h2>{member.name === "—" ? "" : member.name}</h2>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="roster-empty">現在、表示できる選手情報はありません。</p>
        )}
      </section>
    </main>
  );
}
