(() => {
  const $ = s => document.querySelector(s);
  const catalog = buildCatalog();
  const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
  const meta = it => `<span class="match">${it.match}% Match</span><span>${fmt(it.duration)}</span><span class="tag">${it.mood.name}</span><span class="tag">HD</span>`;

  /* ---------- Rows ---------- */
  function renderRows(){
    $("#rows").innerHTML = catalog.map(m => `
      <section class="row"><h3>${m.emojis[0]} ${m.name}</h3>
        <div class="row-wrap">
          <button class="arrow l" aria-label="Scroll left">‹</button>
          <div class="track">${m.items.map(it => `
            <div class="card" tabindex="0" data-id="${it.id}"
              style="background:linear-gradient(135deg,${m.grad[0]},${m.grad[1]});filter:hue-rotate(${it.hue}deg)">
              <span class="dur">${fmt(it.duration)}</span>
              <span class="emoji">${it.emoji}</span>
              <span class="ctitle">${it.title}</span>
              <div class="info"><span class="match">${it.match}%</span><span class="tag">${m.name}</span></div>
            </div>`).join("")}
          </div>
          <button class="arrow r" aria-label="Scroll right">›</button>
        </div></section>`).join("");
    document.querySelectorAll(".row-wrap").forEach(w => {
      const tr = w.querySelector(".track");
      w.querySelector(".l").onclick = () => tr.scrollBy({left:-tr.clientWidth*.8});
      w.querySelector(".r").onclick = () => tr.scrollBy({left: tr.clientWidth*.8});
    });
  }
  const byId = id => catalog.flatMap(m => m.items).find(i => i.id === id);

  /* ---------- Hero ---------- */
  const featured = catalog.find(m => m.id==="rainy").items[0];
  function renderHero(){
    $("#hero-title").textContent = featured.title;
    $("#hero-desc").textContent = featured.desc;
    $("#hero-meta").innerHTML = meta(featured);
    Scene.create($("#hero-canvas"), featured.mood.scene).start();
    $("#hero-play").onclick = () => openPlayer(featured);
  }

  /* ---------- Modals ---------- */
  let lastFocus = null;
  function openModal(el){ lastFocus=document.activeElement; el.hidden=false; document.body.style.overflow="hidden"; el.querySelector(".close").focus(); }
  function closeModal(el){ if(el.hidden) return; el.hidden=true; document.body.style.overflow="";
    if(el.id==="player") stopPlayer(); lastFocus?.focus?.(); }

  /* ---------- Player ---------- */
  let scene=null, playing=false, pos=0, dur=0, raf=0, lastT=0;
  function openPlayer(it){
    $("#player-title").textContent = it.title;
    $("#player-desc").textContent = it.desc;
    $("#player-meta").innerHTML = meta(it);
    openModal($("#player"));
    scene?.destroy(); scene = Scene.create($("#player-canvas"), it.mood.scene); scene.start();
    pos=0; dur=it.duration; setPlaying(true);
    lastT=performance.now(); cancelAnimationFrame(raf); raf=requestAnimationFrame(tick);
  }
  function tick(now){ if(playing){ pos=Math.min(dur,pos+(now-lastT)/1000); if(pos>=dur) setPlaying(false);} lastT=now; updateProgress(); raf=requestAnimationFrame(tick); }
  function updateProgress(){ $("#bar").style.width = (pos/dur*100)+"%"; $("#time").textContent = `${fmt(pos)} / ${fmt(dur)}`; }
  function setPlaying(p){ playing=p; scene?.setPlaying(p); const ic=p?"❚❚":"▶"; $("#toggle").textContent=ic; $("#big-play").textContent=ic; }
  function stopPlayer(){ cancelAnimationFrame(raf); scene?.destroy(); scene=null; playing=false; }

  /* ---------- Events ---------- */
  function bind(){
    $("#rows").addEventListener("click", e => { const c=e.target.closest(".card"); if(c) openPlayer(byId(c.dataset.id)); });
    $("#rows").addEventListener("keydown", e => { const c=e.target.closest(".card"); if(c && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); openPlayer(byId(c.dataset.id)); }});
    $("#toggle").onclick = $("#big-play").onclick = () => setPlaying(!playing);
    $("#progress").onclick = e => { const r=e.currentTarget.getBoundingClientRect(); pos=dur*(e.clientX-r.left)/r.width; updateProgress(); };
    document.querySelectorAll("[data-open-signup]").forEach(b => b.onclick = () => {
      $("#signup-form-wrap").hidden=false; $("#signup-done").hidden=true; openModal($("#signup")); });
    $("#signup-form").onsubmit = e => { e.preventDefault(); $("#signup-form-wrap").hidden=true; $("#signup-done").hidden=false; };
    document.querySelectorAll(".modal").forEach(m => {
      m.addEventListener("click", e => { if(e.target===m || e.target.closest("[data-close]")) closeModal(m); });
    });
    document.addEventListener("keydown", e => {
      if(e.key==="Escape") document.querySelectorAll(".modal").forEach(closeModal);
      if(e.key===" " && !$("#player").hidden && e.target.tagName!=="BUTTON"){ e.preventDefault(); setPlaying(!playing); }
    });
    addEventListener("scroll", () => $("#nav").classList.toggle("solid", scrollY>40), {passive:true});
  }

  renderRows(); renderHero(); bind();
  // Deep-link for demos/screenshots: index.html#play=rainy-0
  const m = location.hash.match(/play=([\w-]+)/); if(m && byId(m[1])) openPlayer(byId(m[1]));
})();
