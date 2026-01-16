import { useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import EmailTable from "../components/EmailTable";
import ComposeModal from "../components/ComposeModal";
import { getScheduledEmails, getSentEmails } from "../api/emailApi";

export default function Dashboard() {
  const [active, setActive] = useState("scheduled");
  const [scheduled, setScheduled] = useState([]);
  const [sent, setSent] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getScheduledEmails().then(setScheduled);
    getSentEmails().then(setSent);
  }, []);

  return (
    <div>
      <Header
        user={{ name: "Suraj", email: "suraj@test.com", picture: "https://i.pravatar.cc/40" }}
        onLogout={() => alert("logout")}
      />

      <div className="p-6">
        <div className="flex justify-between">
          <Tabs active={active} setActive={setActive} />
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2"
          >
            Compose New Email
          </button>
        </div>

        {active === "scheduled" && (
          <EmailTable data={scheduled} type="scheduled" />
        )}
        {active === "sent" && <EmailTable data={sent} type="sent" />}
      </div>

      {open && <ComposeModal onClose={() => setOpen(false)} />}
    </div>
  );
}
