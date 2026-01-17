const STORAGE_KEY = "lc75-progress-v1";

const loadProgress = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
};

const saveProgress = (progress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const state = {
    problems: window.LC75 || [],
    progress: loadProgress(), // { [id]: "todo" | "doing" | "done" }
    filters: { q: "", category: "all", difficulty: "all", status: "all" },
};

const el = {
    search: document.getElementById("search"),
    category: document.getElementById("category"),
    difficulty: document.getElementById("difficulty"),
    status: document.getElementById("status"),
    list: document.getElementById("list"),
    stats: document.getElementById("stats"),
};

const getStatus = (id) => state.progress[id] || "todo";

const setStatus = (id, nextStatus) => {
    state.progress[id] = nextStatus;
    saveProgress(state.progress);
    render();
};

const unique = (arr) => [...new Set(arr)];

const escapeHTML = (value) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" };
    return String(value).replace(/[&<>"']/g, (ch) => map[ch]);
};

const getSolutionEntry = (id) => window.SOLUTIONS?.[id];

const getSolutionFn = (entry) => {
    if (typeof entry === "function") return entry;
    if (entry && typeof entry.fn === "function") return entry.fn;
    return null;
};

const getSolutionCode = (entry) => {
    if (!entry) return "";
    if (typeof entry === "function") return entry.toString();
    if (typeof entry.code === "string") return entry.code;
    if (typeof entry.fn === "function") return entry.fn.toString();
    return "";
};

const populateCategories = () => {
    const cats = unique(state.problems.map(p => p.category)).sort();
    for (const c of cats) {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        el.category.appendChild(opt);
    }
};

const matchesFilters = (p) => {
    const status = getStatus(p.id);
    const q = state.filters.q.trim().toLowerCase();

    if (q) {
        const hay = `${p.title} ${p.lc} ${p.category} ${p.difficulty}`.toLowerCase();
        if (!hay.includes(q)) return false;
    }
    if (state.filters.category !== "all" && p.category !== state.filters.category) return false;
    if (state.filters.difficulty !== "all" && p.difficulty !== state.filters.difficulty) return false;
    if (state.filters.status !== "all" && status !== state.filters.status) return false;

    return true;
};

const lcLink = (lcNum) => `https://leetcode.com/problems/${lcNum}/`; // placeholder if you prefer numeric routing
// If you want real slug links, store slug in data.js and use that instead.

const renderStats = (shown) => {
    const total = state.problems.length;
    const done = state.problems.filter(p => getStatus(p.id) === "done").length;
    const doing = state.problems.filter(p => getStatus(p.id) === "doing").length;
    el.stats.textContent = `Showing ${shown}/${total} • Done: ${done} • Doing: ${doing} • Todo: ${total - done - doing}`;
};

const cardHTML = (p) => {
    const status = getStatus(p.id);
    const solutionEntry = getSolutionEntry(p.id);
    const solutionCode = getSolutionCode(solutionEntry).trim();
    const hasSolution = solutionCode.length > 0;
    return `
    <div class="card">
      <div class="row">
        <h3>${p.title}</h3>
        <span class="badge">${status.toUpperCase()}</span>
      </div>

      <div class="meta">
        <span class="badge">LC ${p.lc}</span>
        <span class="badge">${p.difficulty}</span>
        <span class="badge">${p.category}</span>
      </div>

      <div class="row">
        <div class="btns">
          <button data-action="todo" data-id="${p.id}">Todo</button>
          <button data-action="doing" data-id="${p.id}">Doing</button>
          <button data-action="done" data-id="${p.id}">Done</button>
        </div>
      </div>

      ${hasSolution ? `
      <details class="solution">
        <summary>Solution</summary>
        <pre><code>${escapeHTML(solutionCode)}</code></pre>
      </details>
      ` : `
      <div class="solution solution--missing">
        <span class="muted">Solution not added yet.</span>
      </div>
      `}
    </div>
  `;
};
const deepEqual = (a, b) => {
    if (Object.is(a, b)) return true;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (a && b && typeof a === "object" && typeof b === "object") {
        const ka = Object.keys(a), kb = Object.keys(b);
        if (ka.length !== kb.length) return false;
        for (const k of ka) if (!deepEqual(a[k], b[k])) return false;
        return true;
    }

    return false;
};

const runTestsForProblem = (p) => {
    const fn = getSolutionFn(getSolutionEntry(p.id));
    if (!fn) return { status: "missing", passed: 0, total: p.tests?.length || 0, details: [] };
    if (!Array.isArray(p.tests) || p.tests.length === 0) return { status: "no-tests", passed: 0, total: 0, details: [] };

    let passed = 0;
    const details = [];

    for (let i = 0; i < p.tests.length; i++) {
        const { input, expected } = p.tests[i];
        try {
            const actual = fn(...input);
            const ok = deepEqual(actual, expected);
            if (ok) passed++;
            details.push({ i, ok, input, expected, actual });
        } catch (err) {
            details.push({ i, ok: false, input, expected, actual: String(err) });
        }
    }

    const status = passed === p.tests.length ? "pass" : "fail";
    return { status, passed, total: p.tests.length, details };
};

const render = () => {
    const filtered = state.problems.filter(matchesFilters);
    el.list.innerHTML = filtered.map(cardHTML).join("");
    renderStats(filtered.length);
};

const wireEvents = () => {
    el.search.addEventListener("input", (e) => {
        state.filters.q = e.target.value;
        render();
    });

    el.category.addEventListener("change", (e) => {
        state.filters.category = e.target.value;
        render();
    });

    el.difficulty.addEventListener("change", (e) => {
        state.filters.difficulty = e.target.value;
        render();
    });

    el.status.addEventListener("change", (e) => {
        state.filters.status = e.target.value;
        render();
    });

    el.list.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action][data-id]");
        if (!btn) return;
        setStatus(btn.dataset.id, btn.dataset.action);
    });
};

populateCategories();
wireEvents();
render();
