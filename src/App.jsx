import { useState } from "react";

const AFFILIATE_TAG = "quickgiftfi09-20";

const occasions = ["Birthday", "Christmas", "Anniversary", "Wedding", "Baby Shower", "Graduation", "Valentine's Day", "Father's Day", "Mother's Day", "Just Because"];
const relationships = ["Partner/Spouse", "Mom", "Dad", "Brother", "Sister", "Friend", "Coworker", "Boss", "Child", "Grandparent"];
const budgets = ["Under $25", "$25–$50", "$50–$100", "$100–$200", "$200+"];
const interests = ["Tech & Gadgets", "Outdoors & Adventure", "Cooking & Food", "Fitness & Wellness", "Art & Creativity", "Books & Learning", "Travel", "Gaming", "Fashion & Style", "Home & Garden", "Music", "Sports"];

const CATEGORY_EMOJIS = {
  "Tech & Gadgets": "⚡", "Outdoors & Adventure": "🏕️", "Cooking & Food": "🍳",
  "Fitness & Wellness": "💪", "Art & Creativity": "🎨", "Books & Learning": "📚",
  "Travel": "✈️", "Gaming": "🎮", "Fashion & Style": "👗", "Home & Garden": "🏡",
  "Music": "🎵", "Sports": "🏆"
};

const GIFT_ICONS = ["🎁","🛍️","✨","💎","🌟","🎯","🔮","🎀"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f0a00; font-family: 'DM Sans', sans-serif; color: #f5ead0; min-height: 100vh; }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 20%, #2a1500 0%, #0f0a00 50%),
                radial-gradient(ellipse at 80% 80%, #1a0a20 0%, transparent 60%);
    position: relative; overflow: hidden;
  }
  .app::before {
    content: ''; position: fixed; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle at 15% 85%, rgba(255,140,0,0.08) 0%, transparent 40%),
                      radial-gradient(circle at 85% 15%, rgba(200,80,200,0.06) 0%, transparent 40%);
  }
  .noise {
    position: fixed; inset: 0; opacity: 0.03; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .container { max-width: 780px; margin: 0 auto; padding: 40px 20px 80px; position: relative; z-index: 1; }

  /* HEADER */
  .header { text-align: center; margin-bottom: 52px; }
  .ribbon {
    display: inline-block; font-size: 11px; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: #ff9f2f; border: 1px solid rgba(255,159,47,0.3);
    padding: 6px 16px; border-radius: 100px; margin-bottom: 20px; background: rgba(255,159,47,0.05);
  }
  h1 { font-family: 'Playfair Display', serif; font-size: clamp(38px, 8vw, 64px); font-weight: 900; line-height: 1.05; color: #f5ead0; margin-bottom: 16px; }
  h1 span { color: #ff9f2f; font-style: italic; }
  .subtitle { font-size: 16px; color: rgba(245,234,208,0.55); font-weight: 300; max-width: 400px; margin: 0 auto; line-height: 1.6; }

  /* FORM CARDS */
  .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 28px 32px; backdrop-filter: blur(20px); margin-bottom: 16px; }
  .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #ff9f2f; margin-bottom: 14px; }
  .chip-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.12);
    background: transparent; color: rgba(245,234,208,0.7); font-size: 13px;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s ease; font-weight: 400;
  }
  .chip:hover { border-color: rgba(255,159,47,0.4); color: #f5ead0; background: rgba(255,159,47,0.06); }
  .chip.selected { background: rgba(255,159,47,0.15); border-color: #ff9f2f; color: #ff9f2f; font-weight: 500; }
  .row-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 540px) { .row-two { grid-template-columns: 1fr; } }
  .age-input {
    width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px; padding: 12px 16px; color: #f5ead0; font-size: 15px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.15s;
  }
  .age-input:focus { border-color: rgba(255,159,47,0.5); }
  .age-input::placeholder { color: rgba(245,234,208,0.3); }
  .interests-note { font-size: 12px; color: rgba(245,234,208,0.35); margin-top: 10px; }

  /* CTA */
  .cta-btn {
    width: 100%; padding: 18px; border-radius: 14px; border: none;
    background: linear-gradient(135deg, #ff9f2f, #e05c00); color: #0f0a00;
    font-size: 16px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.02em; position: relative; overflow: hidden;
  }
  .cta-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent); opacity: 0; transition: opacity 0.2s; }
  .cta-btn:hover::after { opacity: 1; }
  .cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(255,159,47,0.35); }
  .cta-btn:active { transform: translateY(0); }
  .cta-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* LOADING */
  .loading-wrap { text-align: center; padding: 60px 20px; }
  .spinner { width: 44px; height: 44px; border: 3px solid rgba(255,159,47,0.15); border-top-color: #ff9f2f; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-family: 'Playfair Display', serif; font-size: 20px; color: rgba(245,234,208,0.6); font-style: italic; }

  /* RESULTS HEADER */
  .results-header { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; margin-bottom: 8px; color: #f5ead0; }
  .results-header span { color: #ff9f2f; font-style: italic; }
  .results-sub { font-size: 13px; color: rgba(245,234,208,0.35); margin-bottom: 28px; }

  /* GIFT CARDS — RICH VERSION */
  .gift-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 16px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    animation: fadeUp 0.45s ease both;
  }
  .gift-card:nth-child(1) { animation-delay: 0.04s; }
  .gift-card:nth-child(2) { animation-delay: 0.1s; }
  .gift-card:nth-child(3) { animation-delay: 0.16s; }
  .gift-card:nth-child(4) { animation-delay: 0.22s; }
  .gift-card:nth-child(5) { animation-delay: 0.28s; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  .gift-card:hover { border-color: rgba(255,159,47,0.3); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }

  .gift-card-inner { display: flex; gap: 0; }

  /* LEFT PANEL — visual */
  .gift-visual {
    width: 110px;
    min-width: 110px;
    background: linear-gradient(160deg, rgba(255,159,47,0.12), rgba(255,80,120,0.08));
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 10px;
  }
  .gift-icon { font-size: 36px; line-height: 1; }
  .gift-num {
    font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,159,47,0.5);
  }
  .gift-category-badge {
    font-size: 10px; background: rgba(255,159,47,0.1); border: 1px solid rgba(255,159,47,0.2);
    color: rgba(255,159,47,0.8); padding: 3px 8px; border-radius: 100px; text-align: center;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 88px;
  }

  /* RIGHT PANEL — content */
  .gift-content { flex: 1; padding: 20px 22px; min-width: 0; }

  .gift-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
  .gift-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #f5ead0; line-height: 1.25; flex: 1; }
  .gift-price {
    font-size: 13px; font-weight: 600; color: #ff9f2f;
    background: rgba(255,159,47,0.1); border: 1px solid rgba(255,159,47,0.25);
    padding: 4px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0;
  }

  .gift-tagline { font-size: 12px; font-weight: 500; color: #ff9f2f; letter-spacing: 0.05em; margin-bottom: 8px; opacity: 0.8; }

  .gift-why { font-size: 13.5px; color: rgba(245,234,208,0.65); line-height: 1.65; margin-bottom: 14px; }

  .gift-features { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .gift-feature {
    font-size: 11px; padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: rgba(245,234,208,0.55);
  }

  .gift-cta-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .amazon-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 20px;
    background: linear-gradient(135deg, #ff9f2f, #e06000);
    border-radius: 10px; color: #0f0a00; font-size: 13px; font-weight: 600;
    text-decoration: none; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.01em;
  }
  .amazon-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,159,47,0.4); }

  .amazon-hint { font-size: 11px; color: rgba(245,234,208,0.25); }

  @media (max-width: 560px) {
    .gift-visual { width: 72px; min-width: 72px; }
    .gift-icon { font-size: 28px; }
    .gift-category-badge { display: none; }
    .gift-content { padding: 16px; }
  }

  /* RESET + FOOTER */
  .reset-btn {
    background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
    color: rgba(245,234,208,0.4); font-size: 13px; font-family: 'DM Sans', sans-serif;
    padding: 12px 20px; cursor: pointer; transition: all 0.15s; margin-top: 8px;
    display: block; width: 100%; text-align: center;
  }
  .reset-btn:hover { color: #f5ead0; border-color: rgba(255,255,255,0.2); }

  .error-box {
    background: rgba(255,80,80,0.07); border: 1px solid rgba(255,80,80,0.2);
    border-radius: 12px; padding: 16px 20px; color: rgba(255,180,180,0.9);
    font-size: 14px; margin-top: 12px;
  }
  .footer { text-align: center; margin-top: 60px; font-size: 11px; color: rgba(245,234,208,0.18); line-height: 1.9; }
`;

function buildPrompt({ occasion, relationship, age, budget, selectedInterests }) {
  return `You are a creative, thoughtful gift advisor. Suggest exactly 5 specific, concrete gift ideas.

Recipient: ${relationship}, age ${age || "unknown"}
Occasion: ${occasion}
Budget: ${budget}
Interests: ${selectedInterests.length > 0 ? selectedInterests.join(", ") : "general"}

Return ONLY valid JSON — no markdown, no preamble:
{
  "gifts": [
    {
      "name": "Specific Product Name",
      "priceRange": "$XX–$XX",
      "tagline": "4-6 word punchy hook",
      "reason": "2 sentences: why it's perfect for this person and occasion.",
      "features": ["feature 1", "feature 2", "feature 3"],
      "category": "one of the interest categories or 'Lifestyle'",
      "searchQuery": "specific amazon search query"
    }
  ]
}`;
}

function buildAmazonUrl(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`;
}

export default function App() {
  const [occasion, setOccasion] = useState("");
  const [relationship, setRelationship] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gifts, setGifts] = useState(null);
  const [error, setError] = useState("");

  const toggleInterest = (i) =>
    setSelectedInterests(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : prev.length < 4 ? [...prev, i] : prev
    );

  const canSearch = occasion && relationship && budget;

  const handleFind = async () => {
    setLoading(true); setError(""); setGifts(null);
    try {
const res = await fetch("/api/recommend", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: buildPrompt({ occasion, relationship, age, budget, selectedInterests }) })
});
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      setGifts(JSON.parse(clean).gifts);
    } catch (err) {
    setError("Error: " + err.message);
    if (!res.ok) { setError("API error: " + JSON.stringify(data)); return; }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="noise" />
        <div className="container">

          <div className="header">
            <div className="ribbon">✦ AI-Powered Gift Ideas</div>
            <h1>Find the <span>Perfect</span> Gift.</h1>
            <p className="subtitle">Answer 4 quick questions and get 5 handpicked gift ideas in seconds.</p>
          </div>

          {!gifts && !loading && (
            <>
              <div className="row-two">
                <div className="card">
                  <div className="section-label">Occasion</div>
                  <div className="chip-grid">
                    {occasions.map(o => (
                      <button key={o} className={`chip ${occasion === o ? "selected" : ""}`} onClick={() => setOccasion(o)}>{o}</button>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="section-label">Who's it for?</div>
                  <div className="chip-grid">
                    {relationships.map(r => (
                      <button key={r} className={`chip ${relationship === r ? "selected" : ""}`} onClick={() => setRelationship(r)}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row-two">
                <div className="card">
                  <div className="section-label">Their Age (optional)</div>
                  <input className="age-input" type="number" placeholder="e.g. 35" value={age}
                    onChange={e => setAge(e.target.value)} min={1} max={120} />
                </div>
                <div className="card">
                  <div className="section-label">Budget</div>
                  <div className="chip-grid">
                    {budgets.map(b => (
                      <button key={b} className={`chip ${budget === b ? "selected" : ""}`} onClick={() => setBudget(b)}>{b}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="section-label">Their Interests — pick up to 4</div>
                <div className="chip-grid">
                  {interests.map(i => (
                    <button key={i} className={`chip ${selectedInterests.includes(i) ? "selected" : ""}`} onClick={() => toggleInterest(i)}>
                      {CATEGORY_EMOJIS[i]} {i}
                    </button>
                  ))}
                </div>
                <p className="interests-note">Optional — skip if you're not sure.</p>
              </div>

              <button className="cta-btn" disabled={!canSearch} onClick={handleFind}>
                🎁 Find Perfect Gifts →
              </button>
              {error && <div className="error-box">{error}</div>}
            </>
          )}

          {loading && (
            <div className="loading-wrap">
              <div className="spinner" />
              <p className="loading-text">Curating the perfect picks…</p>
            </div>
          )}

          {gifts && (
            <>
              <p className="results-header">5 <span>perfect gifts</span> for your {relationship.toLowerCase()}</p>
              <p className="results-sub">{occasion} · {budget} · Click any gift to shop on Amazon</p>

              {gifts.map((g, i) => (
                <div className="gift-card" key={i}>
                  <div className="gift-card-inner">
                    <div className="gift-visual">
                      <div className="gift-icon">{GIFT_ICONS[i % GIFT_ICONS.length]}</div>
                      <div className="gift-num">Pick #{i + 1}</div>
                      <div className="gift-category-badge">{g.category || "Gift Idea"}</div>
                    </div>
                    <div className="gift-content">
                      <div className="gift-header">
                        <div className="gift-name">{g.name}</div>
                        <div className="gift-price">{g.priceRange}</div>
                      </div>
                      {g.tagline && <div className="gift-tagline">✦ {g.tagline}</div>}
                      <p className="gift-why">{g.reason}</p>
                      {g.features?.length > 0 && (
                        <div className="gift-features">
                          {g.features.map((f, fi) => (
                            <span key={fi} className="gift-feature">✓ {f}</span>
                          ))}
                        </div>
                      )}
                      <div className="gift-cta-row">
                        <a className="amazon-btn" href={buildAmazonUrl(g.searchQuery)} target="_blank" rel="noopener noreferrer">
                          🛒 Shop on Amazon
                        </a>
                        <span className="amazon-hint">Opens Amazon search →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="reset-btn" onClick={() => { setGifts(null); setError(""); }}>← Find More Gifts</button>
            </>
          )}

          <div className="footer">
            <p>QuickGiftFinder.com · AI-powered gift recommendations</p>
            <p>As an Amazon Associate, we earn from qualifying purchases.</p>
          </div>
        </div>
      </div>
    </>
  );
}
