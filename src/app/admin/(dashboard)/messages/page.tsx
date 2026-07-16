"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, CheckCircle, MailOpen } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/messages");
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load customer messages mailbox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.patch("/api/messages", { id });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
      toast.success("Message marked as read!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark message as read");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Opening contact us mailbox...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Mailbox Inbox</h1>
        <p className="text-slate-500 text-sm mt-1">Review contact inquiries submitted by clients directly from the contact portal.</p>
      </div>

      {/* Messages layout */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl text-slate-400 font-medium text-sm">
            No customer inquiries found.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white border rounded-3xl p-6 shadow-xs transition-all relative ${
                !msg.read ? "border-amber-400 ring-2 ring-amber-500/5 bg-amber-50/5" : "border-slate-100"
              }`}
            >
              {/* Header Details */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    !msg.read ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {msg.name}
                      {!msg.read && (
                        <span className="ml-2 text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400">{msg.email} {msg.phone && `| ${msg.phone}`}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Subject / Service Interest
                  </span>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{msg.subject || "General Inquiry"}</p>
                </div>
              </div>

              {/* Message Content Body */}
              <div className="py-4 text-sm text-slate-600 leading-relaxed">
                {msg.message}
              </div>

              {/* Action trigger footer */}
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-semibold">
                  Submitted: {new Date(msg.createdAt).toLocaleString()}
                </span>
                
                {!msg.read ? (
                  <button
                    onClick={() => handleMarkAsRead(msg._id)}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Read</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-bold">
                    <MailOpen className="w-4 h-4" />
                    <span>Read</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
