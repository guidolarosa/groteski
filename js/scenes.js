// Generated, mood-matched animated canvas scenes.
// Scene.create(canvas, sceneId) -> { start, stop, setPlaying, destroy }
const Scene = (() => {
  const rand = (a,b) => a + Math.random()*(b-a);

  const scenes = {
    sleeping(ctx,w,h,t,s){
      const b = (Math.sin(t*0.6)+1)/2;
      const g = ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,`hsl(${240+b*20},50%,${10+b*6}%)`); g.addColorStop(1,`hsl(${280+b*20},40%,${18+b*8}%)`);
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      s.stars ??= Array.from({length:140},()=>({x:Math.random(),y:Math.random()*.75,r:rand(.5,2),p:rand(0,6)}));
      for(const st of s.stars){ ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t+st.p)); ctx.fillStyle="#fff";
        ctx.beginPath(); ctx.arc(st.x*w,st.y*h,st.r,0,7); ctx.fill(); }
      ctx.globalAlpha=1;
      ctx.fillStyle="#fdf6c9"; ctx.shadowColor="#fdf6c9"; ctx.shadowBlur=40;
      ctx.beginPath(); ctx.arc(w*.78,h*.25,h*.09,0,7); ctx.fill(); ctx.shadowBlur=0;
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(w*.78+h*.04,h*.23,h*.08,0,7); ctx.fill();
      // sleeping cat silhouette, breathing
      catLoaf(ctx,w*.5,h*.86,h*.16,1+b*.04,"#0d0b1e");
      ctx.fillStyle="#fff"; ctx.font=`${h*.05}px sans-serif`;
      for(let i=0;i<3;i++){const k=((t*.3+i/3)%1); ctx.globalAlpha=1-k; ctx.fillText("z",w*.56+k*h*.15,h*.7-k*h*.25);}
      ctx.globalAlpha=1;
    },
    playtime(ctx,w,h,t,s){
      const g=ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,"#ff9a8b"); g.addColorStop(1,"#ffd36e");
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      ctx.fillStyle="#0001"; for(let x=0;x<w;x+=60)ctx.fillRect(x,h*.78,30,h*.22);
      // laser dot lissajous with trail
      s.trail ??= [];
      const lx=w*(.5+.4*Math.sin(t*1.7)*Math.cos(t*.5)), ly=h*(.45+.3*Math.sin(t*2.3));
      s.trail.push([lx,ly]); if(s.trail.length>25)s.trail.shift();
      s.trail.forEach(([x,y],i)=>{ctx.globalAlpha=i/25*.4;ctx.fillStyle="#f00";ctx.beginPath();ctx.arc(x,y,4+i/5,0,7);ctx.fill();});
      ctx.globalAlpha=1; ctx.fillStyle="#ff1a1a"; ctx.shadowColor="#f00"; ctx.shadowBlur=30;
      ctx.beginPath(); ctx.arc(lx,ly,9,0,7); ctx.fill(); ctx.shadowBlur=0;
      // yarn ball rolling
      const yx=((t*120)%(w+200))-100, r=h*.08, yy=h*.78-r;
      ctx.save(); ctx.translate(yx,yy); ctx.rotate(t*120/r);
      ctx.fillStyle="#6c5ce7"; ctx.beginPath(); ctx.arc(0,0,r,0,7); ctx.fill();
      ctx.strokeStyle="#a29bfe"; ctx.lineWidth=3;
      for(let i=-2;i<=2;i++){ctx.beginPath();ctx.ellipse(0,0,r*.95,r*.3+Math.abs(i)*r*.12,i*.6,0,7);ctx.stroke();}
      ctx.restore();
      ctx.strokeStyle="#6c5ce7"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(yx-r,yy+r);
      ctx.bezierCurveTo(yx-r*3,h*.82,yx-r*5,h*.75,yx-r*8,h*.8); ctx.stroke();
      // watching cat
      ctx.font=`${h*.2}px sans-serif`; ctx.textAlign="center";
      ctx.fillText("😼",w*.12+Math.sin(t*6)*4,h*.95); ctx.textAlign="left";
    },
    relax(ctx,w,h,t,s){
      const g=ctx.createRadialGradient(w*.5,h*.3,0,w*.5,h*.5,w*.8);
      g.addColorStop(0,"#b5e8c4"); g.addColorStop(1,"#1d5a54"); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      for(let i=0;i<3;i++){ctx.fillStyle=`rgba(20,70,60,${.25+i*.15})`;ctx.beginPath();ctx.moveTo(0,h);
        for(let x=0;x<=w;x+=20)ctx.lineTo(x,h*(.7+i*.08)+Math.sin(x/120+t*.4+i)*15);ctx.lineTo(w,h);ctx.fill();}
      s.leaves ??= Array.from({length:22},()=>({x:Math.random(),y:Math.random(),v:rand(.02,.06),r:rand(0,6),sz:rand(.6,1.3)}));
      ctx.font=`${h*.05}px sans-serif`;
      for(const l of s.leaves){ l.y+=l.v/60; l.x+=Math.sin(t+l.r)*.0008; if(l.y>1.05){l.y=-.05;l.x=Math.random();}
        ctx.save(); ctx.translate(l.x*w,l.y*h); ctx.rotate(Math.sin(t+l.r)*1.2); ctx.scale(l.sz,l.sz); ctx.fillText("🍃",0,0); ctx.restore(); }
      catLoaf(ctx,w*.5,h*.9,h*.13,1+Math.sin(t*.8)*.02,"#173f3a");
    },
    rainy(ctx,w,h,t,s){
      const flash = (Math.sin(t*.7)>.995 || (t%9)>8.9) ? .25 : 0;
      const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,"#1c2b3a"); g.addColorStop(1,"#3d5a6c");
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      // blurry city lights behind glass
      s.lights ??= Array.from({length:30},()=>({x:Math.random(),y:rand(.4,.9),r:rand(8,30),c:`hsla(${rand(20,60)},90%,65%,.25)`}));
      for(const l of s.lights){ctx.fillStyle=l.c;ctx.beginPath();ctx.arc(l.x*w,l.y*h,l.r,0,7);ctx.fill();}
      if(flash){ctx.fillStyle=`rgba(220,230,255,${flash})`;ctx.fillRect(0,0,w,h);}
      s.drops ??= Array.from({length:260},()=>({x:Math.random(),y:Math.random(),v:rand(.6,1.4),l:rand(10,25)}));
      ctx.strokeStyle="rgba(190,220,255,.55)"; ctx.lineWidth=1.3; ctx.beginPath();
      for(const d of s.drops){ d.y+=d.v/60; if(d.y>1){d.y=-.05;d.x=Math.random();}
        ctx.moveTo(d.x*w,d.y*h); ctx.lineTo(d.x*w-3,d.y*h+d.l); }
      ctx.stroke();
      // window drops (slow streaks)
      s.beads ??= Array.from({length:40},()=>({x:Math.random(),y:Math.random(),v:rand(.005,.03),r:rand(2,5)}));
      for(const b of s.beads){ b.y+=b.v/60; if(b.y>1){b.y=0;b.x=Math.random();}
        ctx.fillStyle="rgba(220,240,255,.5)"; ctx.beginPath(); ctx.arc(b.x*w,b.y*h,b.r,0,7); ctx.fill(); }
      // window frame + cat on sill
      ctx.fillStyle="#120d0a"; ctx.fillRect(0,h*.88,w,h*.12); ctx.fillRect(w*.5-6,0,12,h*.88);
      ctx.strokeStyle="#120d0a"; ctx.lineWidth=24; ctx.strokeRect(0,0,w,h*.88);
      catSit(ctx,w*.28,h*.88,h*.3,Math.sin(t*2)*.3);
    },
    birds(ctx,w,h,t,s){
      const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,"#5ec8f5"); g.addColorStop(1,"#d6f1ff");
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      ctx.fillStyle="#fff9"; for(let i=0;i<4;i++){const cx=((t*10+i*w/3)%(w+300))-150; cloud(ctx,cx,h*(.15+i*.08),h*.06);}
      s.birds ??= Array.from({length:9},()=>({x:Math.random(),y:rand(.15,.6),v:rand(.03,.08),p:rand(0,6),s:rand(.6,1.3)}));
      ctx.strokeStyle="#233"; ctx.lineCap="round";
      for(const b of s.birds){ b.x+=b.v/60; if(b.x>1.1){b.x=-.1;b.y=rand(.15,.6);}
        const x=b.x*w, y=b.y*h+Math.sin(t*2+b.p)*10, sz=h*.03*b.s, f=Math.sin(t*12+b.p)*sz*.8;
        ctx.lineWidth=3*b.s; ctx.beginPath(); ctx.moveTo(x-sz,y-f); ctx.quadraticCurveTo(x-sz*.4,y-sz*.2,x,y);
        ctx.quadraticCurveTo(x+sz*.4,y-sz*.2,x+sz,y-f); ctx.stroke(); }
      // tree branch
      ctx.fillStyle="#3b2a1a"; ctx.fillRect(0,h*.82,w,h*.05);
      ctx.fillStyle="#2e7d32"; for(let i=0;i<14;i++){ctx.beginPath();ctx.arc(i*w/13,h*.82,h*.05,0,7);ctx.fill();}
      ctx.font=`${h*.07}px sans-serif`; ctx.fillText("🐦",w*.7,h*.81+Math.abs(Math.sin(t*3))*-6);
      catSit(ctx,w*.15,h, h*.35, Math.sin(t*3)*.4,"#111");
    },
    night(ctx,w,h,t,s){
      const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,"#050a1a"); g.addColorStop(1,"#0f2e3a");
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      ctx.fillStyle="#04121a"; for(let i=0;i<9;i++){const x=i*w/8; ctx.beginPath(); ctx.moveTo(x-60,h); ctx.lineTo(x,h*(.35+(i%3)*.08)); ctx.lineTo(x+60,h); ctx.fill();}
      s.flies ??= Array.from({length:40},()=>({x:Math.random(),y:rand(.2,.9),p:rand(0,6),sp:rand(.3,1)}));
      for(const f of s.flies){ const x=(f.x+Math.sin(t*f.sp+f.p)*.03)*w, y=(f.y+Math.cos(t*f.sp*.8+f.p)*.03)*h;
        const a=Math.max(0,Math.sin(t*2*f.sp+f.p)); ctx.fillStyle=`rgba(220,255,120,${a})`; ctx.shadowColor="#dfff7a"; ctx.shadowBlur=15;
        ctx.beginPath(); ctx.arc(x,y,2.5,0,7); ctx.fill(); }
      ctx.shadowBlur=0;
      // glowing cat eyes
      const blink = (t%4)<.15 ? .1 : 1;
      for(const ex of [-1,1]){ctx.fillStyle="#ffe14d";ctx.shadowColor="#ffe14d";ctx.shadowBlur=20;
        ctx.beginPath(); ctx.ellipse(w*.5+ex*h*.05,h*.62,h*.025,h*.018*blink,0,0,7); ctx.fill();}
      ctx.shadowBlur=0;
    },
  };

  function catLoaf(ctx,x,y,r,sc,col){
    ctx.save(); ctx.translate(x,y); ctx.scale(sc,sc); ctx.fillStyle=col;
    ctx.beginPath(); ctx.ellipse(0,-r*.45,r*1.3,r*.55,0,0,7); ctx.fill();
    ctx.beginPath(); ctx.arc(r*1,-r*.75,r*.42,0,7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(r*.7,-r*1.05); ctx.lineTo(r*.8,-r*1.4); ctx.lineTo(r*.98,-r*1.12); ctx.fill();
    ctx.beginPath(); ctx.moveTo(r*1.05,-r*1.12); ctx.lineTo(r*1.25,-r*1.4); ctx.lineTo(r*1.33,-r*1.0); ctx.fill();
    ctx.restore();
  }
  function catSit(ctx,x,y,hh,tail,col="#0a0806"){
    ctx.save(); ctx.translate(x,y); ctx.fillStyle=col; ctx.strokeStyle=col;
    ctx.beginPath(); ctx.ellipse(0,-hh*.3,hh*.22,hh*.32,0,0,7); ctx.fill();
    ctx.beginPath(); ctx.arc(0,-hh*.72,hh*.15,0,7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-hh*.14,-hh*.78); ctx.lineTo(-hh*.1,-hh*.98); ctx.lineTo(-hh*.02,-hh*.84);
    ctx.moveTo(hh*.14,-hh*.78); ctx.lineTo(hh*.1,-hh*.98); ctx.lineTo(hh*.02,-hh*.84); ctx.fill();
    ctx.lineWidth=hh*.06; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(hh*.18,-hh*.05);
    ctx.quadraticCurveTo(hh*.5,-hh*.1,hh*(.45+tail*.2),-hh*.45); ctx.stroke();
    ctx.restore();
  }
  function cloud(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.arc(x+r,y-r*.4,r*1.2,0,7);ctx.arc(x+r*2.2,y,r,0,7);ctx.fill();}

  function create(canvas, sceneId){
    const ctx=canvas.getContext("2d"); const draw=scenes[sceneId]; const state={};
    let raf=0, playing=true, t=3, last=performance.now();
    function resize(){const d=Math.min(devicePixelRatio||1,2); const r=canvas.getBoundingClientRect();
      canvas.width=Math.max(1,r.width*d); canvas.height=Math.max(1,r.height*d); ctx.setTransform(d,0,0,d,0,0);}
    function frame(now){ const dt=Math.min(.05,(now-last)/1000); last=now; if(playing)t+=dt;
      const r=canvas.getBoundingClientRect(); draw(ctx,r.width,r.height,t,state); raf=requestAnimationFrame(frame); }
    const ro=new ResizeObserver(resize); ro.observe(canvas); resize();
    return {
      start(){ last=performance.now(); cancelAnimationFrame(raf); raf=requestAnimationFrame(frame); },
      setPlaying(p){ playing=p; },
      destroy(){ cancelAnimationFrame(raf); ro.disconnect(); },
    };
  }
  return { create };
})();
