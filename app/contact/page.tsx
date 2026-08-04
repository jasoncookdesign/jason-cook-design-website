import { redirect } from "next/navigation";

// The "Start a conversation" CTA routes here; this page forwards to the
// cal.com booking page. A simple redirect keeps the internal route
// resolvable without 404 while the external booking link stays canonical.
export default function ContactPage() {
  redirect("https://cal.com/jasoncookdesign/engagement-consultation");
}
