import { useState } from "react";
import axios from "axios";


const API = "https://reachinbox-task-8al0.onrender.com/api";

export default function App() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [scheduled, setScheduled] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false);

  async function scheduleEmails() {
    if (!emails || !subject || !body) {
      alert("Please fill all fields");
      return;
    }

    const emailList = emails
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      await axios.post(`${API}/schedule/createschedule`, {
        emails: emailList,
        subject,
        body,
        startTime: new Date(Date.now() + 60000),
        delayBetween: 5,
      });

      alert("Emails scheduled");
      setEmails("");
      setSubject("");
      setBody("");
    } catch (err) {
      alert("Error scheduling emails");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- GET: Scheduled ---------- */
  async function loadScheduled() {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/emails/scheduled`);
      console.log(res);
      
      setScheduled(res.data.data || []);
    } catch {
      alert("Failed to load scheduled emails");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- GET: Sent ---------- */
  async function loadSent() {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/emails/sent`);
      setSent(res.data.data || []);
    } catch {
      alert("Failed to load sent emails");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-6">
        <div style={page}>
          <div style={card}>
            <h2 style={{ textAlign: "center" }}>📧 Email Scheduler</h2>

            {/* FORM */}
            <label>Emails (comma separated)</label>
            <input
              value={emails}
              onChange={e => setEmails(e.target.value)}
              placeholder="a@test.com, b@test.com"
              style={input}
            />

            <label>Subject</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={input}
            />

            <label>Body</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              style={{ ...input, height: 90 }}
            />

            <button onClick={scheduleEmails} style={primaryBtn}>
              {loading ? "Please wait..." : "Schedule Emails"}
            </button>

            {/* ACTIONS */}
            <div style={{ marginTop: 20 }}>
              <button onClick={loadScheduled} style={secondaryBtn}>
                Load Scheduled
              </button>
              <button onClick={loadSent} style={secondaryBtn}>
                Load Sent
              </button>
            </div>

            {/* SCHEDULED */}
            <section>
              <h3>⏳ Scheduled Emails</h3>
              {scheduled.length === 0 && <p>No scheduled emails</p>}
              {scheduled?.map(e => (
                <div key={e._id} style={row}>
                  {e.to} — {new Date(e.scheduledAt).toLocaleString()}
                </div>
              ))}
            </section>

            {/* SENT */}
            <section>
              <h3>✅ Sent Emails</h3>
              {sent.length === 0 && <p>No sent emails</p>}
              {sent?.map(e => (
                <div key={e._id} style={row}>
                  {e.to} — {new Date(e.sentAt).toLocaleString()}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const page = {
  minHeight: "100vh",
  background: "#f2f2f2",
  padding: 20,
  display: "flex",
  justifyContent: "center",
};

const card = {
  width: 600,
  background: "#ffffff",
  padding: 20,
  borderRadius: 8,
  color: "#000",
};

const input = {
  width: "100%",
  padding: 8,
  marginBottom: 12,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#000",
  WebkitTextFillColor: "#000",
};

const primaryBtn = {
  width: "100%",
  padding: 10,
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "6px 10px",
  marginRight: 10,
};

const row = {
  padding: "6px 0",
  borderBottom: "1px solid #eee",
};
