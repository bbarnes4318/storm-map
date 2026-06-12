"use client";

import React, { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  Search,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  List,
  History,
  Key,
  FileText,
  X,
  User,
} from "lucide-react";

type TabType = "accounts" | "ledger" | "unlocks" | "audit";

interface Account {
  accountId: string;
  email: string;
  authProvider: string;
  authUserId: string;
  creditBalance: number;
  createdAt: string;
  updatedAt: string;
}

interface LedgerEntry {
  id: string;
  accountId: string;
  email: string;
  amount: number;
  txType: string;
  idempotencyKey: string;
  referenceId: string | null;
  description: string | null;
  createdAt: string;
}

interface Unlock {
  unlockId: string;
  accountId: string;
  email: string;
  productType: string;
  addressText: string;
  creditsCharged: number;
  providerSource: string;
  isCached: boolean;
  createdAt: string;
}

interface AuditLog {
  id: string;
  accountId: string | null;
  email: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  metadata: any;
  createdAt: string;
}

export default function AdminEnrichmentDashboard() {
  const { isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("accounts");
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Data States
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [unlocks, setUnlocks] = useState<Unlock[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Search & Filters
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [accountDetails, setAccountDetails] = useState<any>(null);

  // Credit Grant Modal State
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [grantTarget, setGrantTarget] = useState<Account | null>(null);
  const [grantAmount, setGrantAmount] = useState<string>("");
  const [grantReason, setGrantReason] = useState<string>("");
  const [isGranting, setIsGranting] = useState(false);
  const [grantError, setGrantError] = useState<string | null>(null);
  const [grantSuccess, setGrantSuccess] = useState<boolean>(false);

  // Load Data based on Active Tab
  const loadTabContents = async (tab: TabType, searchEmail = "") => {
    setIsLoading(true);
    setAuthError(null);
    try {
      let url = "";
      if (tab === "accounts") {
        url = `/storm-map/api/enrichment/admin/accounts${searchEmail ? `?email=${encodeURIComponent(searchEmail)}` : ""}`;
        const res = await fetch(url);
        if (res.status === 401) throw new Error("UNAUTHORIZED");
        if (res.status === 403) throw new Error("FORBIDDEN");
        const json = await res.json();
        if (json.ok) setAccounts(json.data.accounts);
      } else if (tab === "ledger") {
        url = "/storm-map/api/enrichment/admin/ledger";
        const res = await fetch(url);
        if (res.status === 401) throw new Error("UNAUTHORIZED");
        if (res.status === 403) throw new Error("FORBIDDEN");
        const json = await res.json();
        if (json.ok) setLedgerEntries(json.data.ledgerEntries);
      } else if (tab === "unlocks") {
        url = "/storm-map/api/enrichment/admin/unlocks";
        const res = await fetch(url);
        if (res.status === 401) throw new Error("UNAUTHORIZED");
        if (res.status === 403) throw new Error("FORBIDDEN");
        const json = await res.json();
        if (json.ok) setUnlocks(json.data.unlocks);
      } else if (tab === "audit") {
        url = "/storm-map/api/enrichment/admin/audit-logs";
        const res = await fetch(url);
        if (res.status === 401) throw new Error("UNAUTHORIZED");
        if (res.status === 403) throw new Error("FORBIDDEN");
        const json = await res.json();
        if (json.ok) setAuditLogs(json.data.auditLogs);
      }
    } catch (err: any) {
      if (err.message === "UNAUTHORIZED" || err.message === "FORBIDDEN") {
        setAuthError(err.message);
      } else {
        console.error("Fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadTabContents(activeTab);
    } else if (isLoaded && !isSignedIn) {
      setIsLoading(false);
      setAuthError("UNAUTHORIZED");
    }
  }, [isLoaded, isSignedIn, activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadTabContents("accounts", emailSearch);
  };

  const handleRefresh = () => {
    loadTabContents(activeTab, activeTab === "accounts" ? emailSearch : "");
  };

  const loadAccountDetails = async (accountId: string) => {
    setSelectedAccountId(accountId);
    setAccountDetails(null);
    try {
      const res = await fetch(`/storm-map/api/enrichment/admin/accounts/${accountId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.ok) {
          setAccountDetails(json.data);
        }
      }
    } catch (err) {
      console.error("Error fetching account details:", err);
    }
  };

  const handleGrantCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantTarget) return;

    setGrantError(null);
    setGrantSuccess(false);
    setIsGranting(true);

    const parsedAmount = parseInt(grantAmount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setGrantError("Please enter a valid positive integer amount.");
      setIsGranting(false);
      return;
    }

    if (!grantReason.trim()) {
      setGrantError("Please provide a reason for the credit adjustment.");
      setIsGranting(false);
      return;
    }

    try {
      const res = await fetch(`/storm-map/api/enrichment/admin/accounts/${grantTarget.accountId}/credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount,
          reason: grantReason.trim(),
        }),
      });

      const json = await res.json();
      if (res.ok && json.ok) {
        setGrantSuccess(true);
        // Refresh active tab
        loadTabContents(activeTab, activeTab === "accounts" ? emailSearch : "");
        // Reset inputs
        setGrantAmount("");
        setGrantReason("");
        // Close modal after delay
        setTimeout(() => {
          setShowGrantModal(false);
          setGrantSuccess(false);
          setGrantTarget(null);
        }, 1500);
      } else {
        setGrantError(json.error || "Failed to grant credits.");
      }
    } catch (err) {
      setGrantError("Network error. Please try again.");
    } finally {
      setIsGranting(false);
    }
  };

  if (!isLoaded || isLoading && activeTab === "accounts" && accounts.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-red-500" />
          <span className="text-xs uppercase font-extrabold tracking-wider animate-pulse">
            Loading Admin Console...
          </span>
        </div>
      </div>
    );
  }

  // Handle Unauthenticated
  if (authError === "UNAUTHORIZED") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center shadow-glass backdrop-blur">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-bold text-slate-200">Authentication Required</h2>
          <p className="mt-2 text-sm text-slate-400">
            You must be signed in with an authorized administrator account to view this page.
          </p>
          <div className="mt-6">
            <Link
              href="/storm-map/sign-in"
              className="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-500 focus:outline-none transition"
            >
              Sign In to StormTarget
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Access Denied
  if (authError === "FORBIDDEN") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center shadow-glass backdrop-blur">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-4 text-lg font-bold text-slate-200">Access Denied</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your account does not have administrator permissions. Please contact system support if this is incorrect.
          </p>
          <div className="mt-6">
            <Link
              href="/storm-map"
              className="inline-flex w-full justify-center rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
            >
              Return to Storm Map
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar Nav */}
      <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900/40 p-4">
        <div className="flex items-center gap-2 px-2 pb-6 pt-2 border-b border-slate-800/60">
          <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
            <span className="text-red-500">⚡</span> Admin Control
          </span>
        </div>

        <nav className="mt-6 flex-1 space-y-1">
          <button
            onClick={() => {
              setActiveTab("accounts");
              setSelectedAccountId(null);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "accounts"
                ? "bg-red-950/40 text-red-400 border border-red-900/30"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
          >
            <User className="h-4 w-4" />
            User Accounts
          </button>
          <button
            onClick={() => {
              setActiveTab("ledger");
              setSelectedAccountId(null);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "ledger"
                ? "bg-red-950/40 text-red-400 border border-red-900/30"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
          >
            <History className="h-4 w-4" />
            Credit Ledger
          </button>
          <button
            onClick={() => {
              setActiveTab("unlocks");
              setSelectedAccountId(null);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "unlocks"
                ? "bg-red-950/40 text-red-400 border border-red-900/30"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
          >
            <Key className="h-4 w-4" />
            Lead Unlocks
          </button>
          <button
            onClick={() => {
              setActiveTab("audit");
              setSelectedAccountId(null);
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeTab === "audit"
                ? "bg-red-950/40 text-red-400 border border-red-900/30"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
          >
            <FileText className="h-4 w-4" />
            Audit Logs
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-800/60">
          <Link
            href="/storm-map"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition"
          >
            ← Map Dashboard
          </Link>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex h-full flex-1 flex-col overflow-hidden bg-slate-950">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800/60 bg-slate-900/20 px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-md font-bold tracking-tight text-white capitalize">
              {activeTab === "audit" ? "Audit Log Registry" : `${activeTab} Management`}
            </h1>
            {isLoading && (
              <RefreshCw className="h-4 w-4 animate-spin text-slate-500" />
            )}
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </header>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Active Tab: ACCOUNTS */}
          {activeTab === "accounts" && !selectedAccountId && (
            <div className="space-y-6">
              {/* Filter controls */}
              <form onSubmit={handleSearchSubmit} className="flex max-w-md gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search accounts by email..."
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-600/30"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
                >
                  Search
                </button>
              </form>

              {/* Table */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/20 overflow-hidden shadow">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3">User Email</th>
                      <th className="px-4 py-3">Credits Balance</th>
                      <th className="px-4 py-3">Provider ID</th>
                      <th className="px-4 py-3">Created Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    {accounts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                          No matching accounts found.
                        </td>
                      </tr>
                    ) : (
                      accounts.map((acc) => (
                        <tr key={acc.accountId} className="hover:bg-slate-900/30 transition">
                          <td className="px-4 py-3.5 font-medium text-slate-200">
                            {acc.email}
                          </td>
                          <td className="px-4 py-3.5 font-mono text-slate-100 font-bold">
                            {acc.creditBalance}
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 font-mono">
                            {acc.authUserId.substring(0, 15)}...
                          </td>
                          <td className="px-4 py-3.5 text-slate-400">
                            {new Date(acc.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3.5 text-right space-x-2">
                            <button
                              onClick={() => loadAccountDetails(acc.accountId)}
                              className="rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition"
                            >
                              Inspect Details
                            </button>
                            <button
                              onClick={() => {
                                setGrantTarget(acc);
                                setShowGrantModal(true);
                              }}
                              className="rounded bg-red-650 hover:bg-red-550 px-2.5 py-1 text-[11px] font-semibold text-white transition inline-flex items-center gap-1"
                            >
                              <Plus className="h-3 w-3" /> Grant Credits
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Account Details Inspect Mode */}
          {activeTab === "accounts" && selectedAccountId && (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedAccountId(null)}
                className="text-xs text-slate-500 hover:text-slate-300 transition"
              >
                ← Back to Accounts list
              </button>

              {!accountDetails ? (
                <div className="flex py-12 items-center justify-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-slate-500" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Account Card */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-white">{accountDetails.account.email}</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Internal ID: <span className="font-mono">{accountDetails.account.accountId}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Clerk User ID: <span className="font-mono">{accountDetails.account.authUserId}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase font-extrabold text-slate-500 block">Credit Balance</span>
                      <span className="text-3xl font-black text-red-400 font-mono mt-1 block">
                        {accountDetails.account.creditBalance}
                      </span>
                    </div>
                  </div>

                  {/* Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Unlocks */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-5 space-y-4">
                      <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-2">
                        <Key className="h-4 w-4 text-red-500" /> Recent Unlocks
                      </h3>
                      <div className="divide-y divide-slate-800/40 overflow-hidden text-xs">
                        {accountDetails.unlocks.length === 0 ? (
                          <p className="text-slate-500 text-center py-4">No unlocks found.</p>
                        ) : (
                          accountDetails.unlocks.map((u: any) => (
                            <div key={u.unlockId} className="py-2.5 flex justify-between">
                              <div>
                                <p className="font-medium text-slate-200">{u.addressText}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                  Product: <span className="uppercase text-slate-400">{u.productType.replace("_", " ")}</span> • Source: {u.providerSource}
                                </p>
                              </div>
                              <span className="font-mono text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Ledger Entries */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-5 space-y-4">
                      <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-2">
                        <History className="h-4 w-4 text-red-500" /> Recent Ledger Entries
                      </h3>
                      <div className="divide-y divide-slate-800/40 overflow-hidden text-xs">
                        {accountDetails.ledgerEntries.length === 0 ? (
                          <p className="text-slate-500 text-center py-4">No ledger records found.</p>
                        ) : (
                          accountDetails.ledgerEntries.map((l: any) => (
                            <div key={l.id} className="py-2.5 flex justify-between items-center">
                              <div>
                                <p className="font-medium text-slate-200">{l.description || l.txType}</p>
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Idem: {l.idempotencyKey.substring(0, 20)}...</p>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold font-mono ${l.amount >= 0 ? "text-green-500" : "text-red-400"}`}>
                                  {l.amount >= 0 ? `+${l.amount}` : l.amount}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Tab: LEDGER */}
          {activeTab === "ledger" && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/20 overflow-hidden shadow">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Account Email</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Transaction Type</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Idempotency Key</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {ledgerEntries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        No ledger entries found.
                      </td>
                    </tr>
                  ) : (
                    ledgerEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-900/30 transition">
                        <td className="px-4 py-3.5 font-medium text-slate-200">
                          {entry.email}
                        </td>
                        <td className={`px-4 py-3.5 font-mono font-bold ${entry.amount >= 0 ? "text-green-500" : "text-red-400"}`}>
                          {entry.amount >= 0 ? `+${entry.amount}` : entry.amount}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px]">
                          {entry.txType}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          {entry.description || "—"}
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-[10px]">
                          {entry.idempotencyKey.substring(0, 20)}...
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {new Date(entry.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Active Tab: UNLOCKS */}
          {activeTab === "unlocks" && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/20 overflow-hidden shadow">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Account Email</th>
                    <th className="px-4 py-3">Target Property</th>
                    <th className="px-4 py-3">Product Type</th>
                    <th className="px-4 py-3">Cost (Credits)</th>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Replay (Cached)</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {unlocks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        No unlock records found.
                      </td>
                    </tr>
                  ) : (
                    unlocks.map((unlock) => (
                      <tr key={unlock.unlockId} className="hover:bg-slate-900/30 transition">
                        <td className="px-4 py-3.5 font-medium text-slate-200">
                          {unlock.email}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300 max-w-xs truncate">
                          {unlock.addressText}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px] uppercase">
                          {unlock.productType.replace("_", " ")}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-100 font-semibold">
                          {unlock.creditsCharged}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px]">
                          {unlock.providerSource}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {unlock.isCached ? (
                            <span className="text-slate-500 bg-slate-900 border border-slate-800 text-[9px] px-1.5 py-0.5 rounded font-medium">Replay</span>
                          ) : (
                            <span className="text-red-400 bg-red-950/20 border border-red-900/20 text-[9px] px-1.5 py-0.5 rounded font-medium">First-time</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {new Date(unlock.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Active Tab: AUDIT */}
          {activeTab === "audit" && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/20 overflow-hidden shadow">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Account Email</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">User Agent</th>
                    <th className="px-4 py-3">Metadata</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        No audit records found.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/30 transition">
                        <td className="px-4 py-3.5 font-medium text-slate-200">
                          {log.email}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="bg-red-950/20 text-red-400 border border-red-900/20 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px]">
                          {log.ipAddress}
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 max-w-xs truncate" title={log.userAgent}>
                          {log.userAgent}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[9px] max-w-xs truncate">
                          {JSON.stringify(log.metadata)}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Credit Grant Modal */}
      {showGrantModal && grantTarget && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowGrantModal(false);
                setGrantError(null);
                setGrantSuccess(false);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-md font-bold text-white flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-red-500" /> Adjust Credit Balance
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Granting manual credits to: <span className="text-slate-300 font-bold">{grantTarget.email}</span>
            </p>

            <form onSubmit={handleGrantCredits} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                  Credits to Add
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={grantAmount}
                  onChange={(e) => setGrantAmount(e.target.value)}
                  disabled={isGranting || grantSuccess}
                  className="w-full mt-1.5 rounded-lg border border-slate-800 bg-slate-950 py-2.5 px-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-red-650/30 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                  Adjustment Reason
                </label>
                <textarea
                  placeholder="e.g. Customer promo grant / onboarding grant"
                  value={grantReason}
                  onChange={(e) => setGrantReason(e.target.value)}
                  disabled={isGranting || grantSuccess}
                  rows={3}
                  className="w-full mt-1.5 rounded-lg border border-slate-800 bg-slate-950 py-2 px-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-red-650/30 disabled:opacity-50 resize-none"
                />
              </div>

              {grantError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-900/30 bg-red-950/20 p-3 text-xs text-red-400">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{grantError}</span>
                </div>
              )}

              {grantSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-green-900/30 bg-green-950/20 p-3 text-xs text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Credits successfully granted!</span>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowGrantModal(false);
                    setGrantError(null);
                    setGrantSuccess(false);
                  }}
                  disabled={isGranting || grantSuccess}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGranting || grantSuccess}
                  className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500 transition disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  {isGranting ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Apply Grant"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
