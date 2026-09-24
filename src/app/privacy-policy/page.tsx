import { Metadata } from "next";
import { PrivacyPolicyClient } from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy & Client Data Protection | DA Interiors Kolkata",
  description:
    "Review DA Interiors' privacy policy, non-disclosure floorplan confidentiality safeguards, and client data protection practices under the DPDP Act 2023 for luxury Kolkata residences.",
  keywords: [
    "DA Interiors privacy policy",
    "interior designer confidentiality kolkata",
    "architectural floorplan NDA kolkata",
    "client data protection interior design",
    "D A interior Design DSID compliance"
  ],
  openGraph: {
    title: "Privacy Policy & Discretion | DA Interiors",
    description:
      "Our unconditional commitment to client privacy, proprietary floorplan confidentiality, and architectural discretion in Kolkata.",
    url: "https://dainterior.in/privacy-policy",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
