export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <section className="container page-title">
        <p className="eyebrow">ABOUT NTTDATA PHOENIX</p>
        <h1>
          OUR
          <br />
          <em>TEAM.</em>
        </h1>
        <p>NTTDATA PHOENIXのチーム紹介、活動情報、連絡先をご案内します。</p>
      </section>

      <section className="container about-story">
        <div className="about-photo-wrap">
          <img
            src="/images/top.jpg"
            alt="NTTDATA PHOENIXのチーム写真"
            className="about-photo"
          />
        </div>
        <div className="about-story-copy">
          <p className="eyebrow">WHO WE ARE</p>
          <p>
            NTTDATAは、若手からベテランまで幅広いメンバーが楽しく野球をしています。
            勝利を目指しながらも、いつも和気あいあいと活動しています。
          </p>
        </div>
      </section>

      <section className="about-info">
        <div className="container about-info-grid">
          <div>
            <p className="eyebrow">ACTIVITY</p>
            <h2>活動日</h2>
            <p className="info-lead">毎週土曜日に基本的に練習試合を行い、たまに練習をしています。</p>
            <dl className="activity-list">
              <div>
                <dt>活動</dt>
                <dd>毎週土曜日（まれに日曜日公式戦）</dd>
              </div>
              <div>
                <dt>場所</dt>
                <dd>夢の島野球場・三郷野球場・その他</dd>
              </div>
            </dl>
            <div className="other-activities">
              <p className="eyebrow">OTHER ACTIVITIES</p>
              <h3>野球以外も楽しんでいます。</h3>
              <p>活動後の飲み会や、メンバー同士でのゴルフなど、野球以外の交流も大切にしています。</p>
            </div>
          </div>
          <div className="contact-card">
            <p className="eyebrow">CONTACT</p>
            <h2>一緒に野球をしませんか？</h2>
            <p>見学・参加・お問い合わせは、LINEからお気軽にご連絡ください。</p>
            <div className="qr-placeholder">
              <img src="/images/line.png" alt="LINE公式アカウントのQRコード" loading="lazy" />
            </div>
            <p className="qr-note">QRコードを読み取ってお気軽にご連絡ください。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
