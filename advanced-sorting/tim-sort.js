//! function to draw bars:
function drawBars(ctx, arr, highlight = null) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    const margin = 40; // space for axes
    const chartWidth = w - margin;
    const chartHeight = h - margin;

    ctx.clearRect(0, 0, w, h);

    const n = arr.length;
    const maxVal = Math.max(...arr);
    const barW = chartWidth / n;

    // -----------------
    // DRAW AXES
    // -----------------
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, 0);
    ctx.lineTo(margin, chartHeight);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, chartHeight);
    ctx.lineTo(w, chartHeight);
    ctx.stroke();

    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";

    // -----------------
    // Y TICKS
    // -----------------
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
        const value = Math.round((maxVal / tickCount) * i);
        const y = chartHeight - (value / maxVal) * chartHeight;

        ctx.fillText(value, 5, y + 3);

        ctx.beginPath();
        ctx.moveTo(margin - 5, y);
        ctx.lineTo(margin, y);
        ctx.stroke();
    }

    // -----------------
    // DRAW BARS
    // -----------------
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        const barH = (val / maxVal) * chartHeight;

        const x = margin + i * barW;
        const y = chartHeight - barH;

        ctx.fillStyle = "#444";

        if (highlight) {
            if (highlight.type === "range" && i >= highlight.l && i <= highlight.r)
                ctx.fillStyle = "#1f77b4";

            if (highlight.type === "pair" && (i === highlight.i || i === highlight.j))
                ctx.fillStyle = "#d62728";
        }

        ctx.fillRect(x + 1, y, barW - 2, barH);

        // X-axis labels (only every few to avoid clutter)
        if (n <= 40 || i % 5 === 0) {
            ctx.fillStyle = "#000";
            ctx.fillText(i, x + barW / 2 - 5, chartHeight + 12);
        }
    }
}

// ---------- TimSort step generator ----------
function* basicTimSortSteps(inputArr, minRun = 32) {
    const arr = [...inputArr];
    const n = arr.length;

    // insertion runs
    for (let start = 0; start < n; start += minRun) {
        const end = Math.min(start + minRun - 1, n - 1);

        for (let i = start + 1; i <= end; i++) {
            const key = arr[i];
            let j = i - 1;

            while (j >= start && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                yield { arr: [...arr], highlight: { type: "range", l: start, r: end } };
            }

            arr[j + 1] = key;
            yield { arr: [...arr], highlight: { type: "range", l: start, r: end } };
        }
    }

    // merge runs
    for (let size = minRun; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid >= right) continue;

            const L = arr.slice(left, mid + 1);
            const R = arr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < L.length && j < R.length) {
                if (L[i] <= R[j]) arr[k++] = L[i++];
                else arr[k++] = R[j++];
                yield { arr: [...arr], highlight: { type: "range", l: left, r: right } };
            }

            while (i < L.length) {
                arr[k++] = L[i++];
                yield { arr: [...arr], highlight: { type: "range", l: left, r: right } };
            }

            while (j < R.length) {
                arr[k++] = R[j++];
                yield { arr: [...arr], highlight: { type: "range", l: left, r: right } };
            }
        }
    }

    return arr;
}

// ---------- animation runner ----------
(function init() {
    const canvas = document.getElementById("c");
    const ctx = canvas.getContext("2d");

    let data = Array.from({ length: 60 }, () => 1 + Math.floor(Math.random() * 100));
    drawBars(ctx, data);

    let animId = null;
    let iterator = null;
    let lastTime = 0;

    const getSpeed = () => Number(document.getElementById("speed").value) || 0;
    const getMinRun = () => Number(document.getElementById("minrun").value) || 32;

    const stop = () => {
        if (animId) cancelAnimationFrame(animId);
        animId = null;
    };

    const animate = (ts) => {
        const speed = getSpeed();

        if (!lastTime) lastTime = ts;
        if (ts - lastTime < speed) {
            animId = requestAnimationFrame(animate);
            return;
        }
        lastTime = ts;

        const step = iterator.next();
        if (step.done) {
            drawBars(ctx, step.value ?? data);
            stop();
            return;
        }

        drawBars(ctx, step.value.arr, step.value.highlight);
        animId = requestAnimationFrame(animate);
    };

    document.getElementById("run").addEventListener("click", () => {
        stop();
        iterator = basicTimSortSteps(data, getMinRun());
        lastTime = 0;
        animId = requestAnimationFrame(animate);
    });

    document.getElementById("shuffle").addEventListener("click", () => {
        stop();
        data = Array.from({ length: 60 }, () => 1 + Math.floor(Math.random() * 100));
        drawBars(ctx, data);
    });
})();