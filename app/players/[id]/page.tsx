import { notFound } from "next/navigation";
import { getTeamData } from "../../../lib/sheets";

export const revalidate = 3600;

function ProfileItem({ label, value }: { label: string; value: string }) {
  if (value === "—") return null;

  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { members } = await getTeamData();
  const member = members.find((candidate) => candidate.number.replace(/^#/, "") === id);

  if (!member) notFound();

  return (
    <main className="inner-page">
      <header className="inner-header container">
        <a className="brand" href="/">
          <span>P</span>HOENIX
        </a>
        <a href="/players">PLAYERS →</a>
      </header>
      <section className="container player-profile">
        <div className="profile-photo">
          {member.imageUrl !== "—" ? (
            <img alt={`${member.name}の写真`} src={member.imageUrl} />
          ) : (
            <span>NO IMAGE</span>
          )}
        </div>
        <div className="profile-summary">
          <p className="eyebrow">PHOENIX PLAYER</p>
          <span className="profile-number">{member.number}</span>
          <h1>{member.name}</h1>
          {member.comment !== "—" && <p className="profile-comment">{member.comment}</p>}
        </div>
        <dl className="profile-data">
          <ProfileItem label="POSITION" value={member.position} />
          <ProfileItem label="部署" value={member.department} />
          <ProfileItem label="出身" value={member.origin} />
          <ProfileItem label="キャッチフレーズ" value={member.comment} />
        </dl>
      </section>
    </main>
  );
}
