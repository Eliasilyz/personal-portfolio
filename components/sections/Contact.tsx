"use client"

import React, { useState } from "react";
import { Mail, Copy, Check, MapPin, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { contact } from "../../content/contact";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {}
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = formData.subject || `Portfolio Inquiry from ${formData.name || 'Visitor'}`;
    const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyFormattedMessage = async () => {
    if (!formData.message.trim()) return;
    const formatted = `Hi Farel,\n\n${formData.message}\n\nBest regards,\n${formData.name || 'Visitor'} (${formData.email || 'No email provided'})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {}
  };

  const inputBase = "w-full px-4 py-3 rounded-full bg-white border border-black/10 text-sm text-black placeholder:text-[#6b6560] focus:outline-none focus:border-[var(--amber)] transition-colors duration-150";

  return (
    <section id="contact" className="section-ink relative overflow-hidden py-16 md:py-24">
      {/* terminal reticle */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 text-white/20 font-mono text-xs" aria-hidden>
        <span>{"<>"}</span>
        <span className="w-8 h-[1px] bg-white/15" />
        <span className="w-2 h-2 rounded-full border border-white/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#e8a020] text-black text-xs font-mono font-bold tracking-widest">[06] / {t("contact.title")}</div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.9] text-[#f7f4ef]" style={{ fontFamily: "var(--font-display)" }}>
              Let&apos;s build<br />
              <span className="italic font-light text-[#f7f4ef]/70">together</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-white/60 max-w-md md:text-right">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-[32px] bg-white text-black p-6 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">{t("contact.directEmail")}</span>
                <div className="flex items-center gap-2 p-2 pl-4 rounded-full bg-black text-white font-mono text-sm">
                  <span className="truncate flex-1">{contact.email}</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[var(--amber)] transition-colors shrink-0"
                    aria-label={t("contact.copyEmail")}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {copiedEmail && <p className="text-xs font-mono text-green-600" role="status">✓ {t("contact.copied")}</p>}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-full bg-black/5 border border-black/10">
                <span className="w-8 h-8 rounded-full bg-[var(--amber)] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-black" />
                </span>
                <span className="text-sm font-mono">{contact.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-1.5 py-3 rounded-full bg-black text-white text-xs font-mono hover:bg-[var(--amber)] hover:text-black transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Mail <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
                <a href="https://t.me/ffarelh" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 py-3 rounded-full border border-black/10 text-xs font-mono hover:border-black transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Telegram <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10">
                {contact.socials.map((soc) => (
                  <a key={soc.platform} href={soc.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full bg-black text-white text-xs font-mono hover:bg-[var(--amber)] hover:text-black transition-colors">
                    {soc.platform} <span className="opacity-60">· {soc.username}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleMailtoSubmit} className="rounded-[32px] bg-white text-black p-6 sm:p-7 space-y-4" noValidate aria-labelledby="contact-form-heading">
              <h3 id="contact-form-heading" className="sr-only">Contact form — required fields marked with star</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">Send Message</span>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black text-white">Static / No backend</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono opacity-60">{t("contact.namePlaceholder")} <span aria-hidden="true" className="text-[#e8a020]">*</span></label>
                  <input id="contact-name" name="name" type="text" required aria-required="true" autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputBase} placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono opacity-60">{t("contact.emailPlaceholder")} <span aria-hidden="true" className="text-[#e8a020]">*</span></label>
                  <input id="contact-email" name="email" type="email" required aria-required="true" autoComplete="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputBase} placeholder="yourname@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono opacity-60">Subject (optional)</label>
                <input id="contact-subject" name="subject" type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={`${inputBase} rounded-full`} placeholder="Project Collaboration / Inquiry" />
              </div>

              <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono opacity-60">{t("contact.messagePlaceholder")} <span aria-hidden="true" className="text-[#e8a020]">*</span></label>
                  <textarea id="contact-message" name="message" required aria-required="true" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-[24px] bg-white border border-black/10 text-sm text-black placeholder:text-[#6b6560] focus:outline-none focus:border-[var(--amber)] transition-colors resize-none" placeholder="Type your message here..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--amber)] text-black text-xs font-mono font-bold hover:bg-black hover:text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Email Client</span>
                </button>
                <button type="button" onClick={handleCopyFormattedMessage} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black/10 text-xs font-mono hover:border-black transition-colors">
                  {copiedMessage ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMessage ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>
              <p className="text-[11px] font-mono opacity-50 text-center leading-relaxed">“Open Email Client” opens Gmail/Outlook/Apple Mail. “Copy Text” for Telegram/Discord.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
