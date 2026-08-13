"use client"

import React, { useState } from "react";
import { Mail, Copy, Check, MapPin, Send, MessageSquare, ExternalLink, ArrowUpRight } from "lucide-react";
import { contact } from "../../content/contact";
import { useLanguage } from "../../lib/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = formData.subject || `Portfolio Inquiry from ${formData.name || 'Visitor'}`;
    const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyFormattedMessage = () => {
    if (!formData.message.trim()) return;
    const formatted = `Hi Farel,\n\n${formData.message}\n\nBest regards,\n${formData.name || 'Visitor'} (${formData.email || 'No email provided'})`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Mail className="w-4 h-4" />
            <span>{t("contact.title")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {t("contact.subtitle")} (Static site ready: messaging directly launches your mail client or Telegram)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Direct Email Card */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {t("contact.directEmail")}
                </span>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 break-all">
                  <span>{contact.email}</span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors shrink-0 ml-2"
                    aria-label={t("contact.copyEmail")}
                    title={t("contact.copyEmail")}
                  >
                    {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-xs text-emerald-500 font-mono font-semibold animate-fadeIn">
                    ✓ {t("contact.copied")}
                  </p>
                )}
              </div>

              {/* Location Card */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {t("contact.location")}
                </span>
                <div className="flex items-center space-x-2 text-sm text-slate-700 dark:text-slate-300 font-medium p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{contact.location}</span>
                </div>
              </div>

              {/* Quick Messaging Actions */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Instant Reach Out
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`mailto:${contact.email}`}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-between font-bold text-xs group"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Mail App</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="https://t.me/ffarelh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-slate-950 transition-all flex items-center justify-between font-bold text-xs group"
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Telegram</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Social Channels
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  {contact.socials.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors flex items-center justify-between group"
                    >
                      <span className="group-hover:text-emerald-500 transition-colors">{soc.platform}</span>
                      <span className="text-emerald-500 font-mono text-[11px]">{soc.username}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Static Mailto / Copy Form) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleMailtoSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Send Message
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Static / GitHub Pages Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {t("contact.namePlaceholder")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {t("contact.emailPlaceholder")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="yourname@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Project Collaboration / Inquiries"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  {t("contact.messagePlaceholder")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 dark:hover:bg-emerald-400 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Email Client</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyFormattedMessage}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {copiedMessage ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMessage ? "Copied Message!" : "Copy Formatted Text"}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center pt-1">
                💡 Standard static behavior: "Open Email Client" launches your email app (Gmail/Outlook/Apple Mail) with pre-filled details. "Copy Formatted Text" copies your message for pasting in Telegram, Discord, or WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

