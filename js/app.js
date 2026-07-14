// Phoenix Dashboard — Core App

import { showModal, closeModal, showToast } from "./components.js";
export { showToast, showModal, closeModal };

export const OWNER = "Hernandoworks";
export const REPO = "Chatgpt";
export const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
export const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main`;

export let allWorkflows = [];
export let allRuns = [];
export let agentData = [];
export let promptFiles = [];
export let agendaMappings = [];

const cache = new Map();
export function cachedFetch(key, fetcher, ttl = 30000) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.time < ttl) return entry.data;
  return fetcher().then(data => { cache.set(key, { data, time: Date.now() }); return data; });
}

export function getToken() {
  const t = document.getElementById('patInput').value;
  const s = sessionStorage.getItem('phoenix_pat');
  if (t) { sessionStorage.setItem('phoenix_pat', t); return t; }
  if (s) { document.getElementById('patInput').value = s; return s; }
  return '';
}

export function setTokenStatus() {
  const el = document.getElementById('patStatus');
  const v = getToken();
  if (v) {
    el.textContent = '\u2705 Authenticated';
    el.style.color = 'var(--success)';
  } else {
    el.textContent = '\u26A0\uFE0F Enter PAT to load data';
    el.style.color = 'var(--warning)';
  }
}

export async function api(path, opts = {}) {
  const token = getToken();
  const headers = { Accept: 'application/vnd.github.v3+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`${BASE}${path}`, { ...opts, headers });
    if (res.status === 401) {
      document.getElementById('patStatus').textContent = 'Invalid or expired PAT';
      document.getElementById('patStatus').style.color = 'var(--error)';
      return null;
    }
    if (res.status === 403 || res.status === 429) {
      const data = await res.json().catch(() => ({}));
      const msg = data.message || 'API rate limited — enter a PAT to increase limit';
      document.getElementById('patStatus').textContent = msg;
      document.getElementById('patStatus').style.color = 'var(--error)';
      return null;
    }
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('API error:', e);
    return null;
  }
}

export function fetchRaw(path) {
  return fetch(`${RAW}/${path}`).then(r => r.ok ? r.text() : '').catch(() => '');
}

export function ago(dateStr) {
  if (!dateStr) return 'never';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now'; if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60); if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function iconFor(conclusion) {
  if (!conclusion) return '<span class="status-icon pending" aria-label="pending">&#x23F3;</span>';
  if (conclusion === 'success') return '<span class="status-icon success" aria-label="success">&#x2705;</span>';
  if (conclusion === 'failure' || conclusion === 'cancelled') return '<span class="status-icon failure" aria-label="failure">&#x274C;</span>';
  return '<span class="status-icon pending" aria-label="pending">&#x23F3;</span>';
}

export function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

export function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', 'false'));
  document.querySelectorAll('.tab-page').forEach(p => p.setAttribute('aria-hidden', 'true'));
  const tab = document.querySelector(`.tab[data-tab="${name}"]`);
  const page = document.getElementById(`page-${name}`);
  if (tab) tab.setAttribute('aria-selected', 'true');
  if (page) page.setAttribute('aria-hidden', 'false');
  window.location.hash = name;
}

export function init() {
  const patEl = document.getElementById('patInput');
  const saved = sessionStorage.getItem('phoenix_pat');
  if (saved) patEl.value = saved;
  setTokenStatus();

  patEl.addEventListener('input', () => {
    const v = patEl.value;
    if (v) sessionStorage.setItem('phoenix_pat', v); else sessionStorage.removeItem('phoenix_pat');
    setTokenStatus();
    if (v) setTimeout(() => window.location.reload(), 500);
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTab(tab.dataset.tab); }
    });
  });

  const hashTab = window.location.hash.replace('#', '');
  if (hashTab && document.querySelector(`.tab[data-tab="${hashTab}"]`)) {
    switchTab(hashTab);
  }

  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
