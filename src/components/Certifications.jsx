import { Award, ExternalLink } from "lucide-react";
import SplitHeading from "./SplitHeading";
import "./Certifications.css";

// Add a `url` field only when you have a real verification link —
// otherwise the card renders without a link, per instructions.
const CERTS = [
  { name: "Google Cybersecurity Professional Certificate", issuer: "Coursera", url: "https://www.coursera.org/account/accomplishments/specialization/JVZKWK62SS6T" },
  { name: "Cybersecurity Job Simulation", issuer: "Mastercard", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_zb8goE7N4XJYgHGCo_1743989953968_completion_certificate.pdf" },
  { name: "STEP Course Certification", issuer: "The Hindu", url: "https://storage.googleapis.com/assets.thehindustep.in/certificates/STEP-269220509829114167-20250421063021.pdf" },
  { name: "Security Operations Center (SOC)", issuer: "CISCO", url: "https://www.coursera.org/account/accomplishments/verify/BFJPVLRZ96YT" },
  { name: "Cybersecurity Analyst Simulation", issuer: "Tata", url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_zb8goE7N4XJYgHGCo_1786877512231_completion_certificate.pdf" },
  { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2B8F74F82885DF4125CDA156C3CE404574B3A0A0ED93DD92DF209BBE362E352C" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <p className="eyebrow">Certifications</p>
        <SplitHeading as="h2" className="section-heading">Learning, verified.</SplitHeading>

        <div className="cert-grid">
          {CERTS.map((cert) => {
            const Wrapper = cert.url ? "a" : "div";
            const wrapperProps = cert.url
              ? { href: cert.url, target: "_blank", rel: "noreferrer", "data-cursor": "link" }
              : {};
            return (
              <Wrapper key={cert.name} className="cert-card" {...wrapperProps}>
                <Award size={20} className="cert-card__icon" />
                <div>
                  <h3>{cert.name}</h3>
                  {cert.issuer && <p>{cert.issuer}</p>}
                </div>
                {cert.url && <ExternalLink size={16} className="cert-card__arrow" />}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
