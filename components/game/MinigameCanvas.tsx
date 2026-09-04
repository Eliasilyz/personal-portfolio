"use client"

import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX, HelpCircle, Trophy, Sparkles } from "lucide-react";
import { useLanguage } from "../../lib/LanguageProvider";

interface Obstacle { x: number; y: number; width: number; height: number; type: "bug_spike" | "glitch_block"; passed: boolean; }
interface Item { x: number; y: number; width: number; height: number; type: "code_chip" | "code_coin"; collected: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number; life: number; }

export default function MinigameCanvas() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const playSound = (type: "jump" | "coin" | "hit") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === "jump") { osc.type = "sine"; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(400, now + 0.15); gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15); osc.start(now); osc.stop(now + 0.15); }
      else if (type === "coin") { osc.type = "triangle"; osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.08); osc.frequency.setValueAtTime(783.99, now + 0.16); gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25); osc.start(now); osc.stop(now + 0.25); }
      else { osc.type = "sawtooth"; osc.frequency.setValueAtTime(200, now); osc.frequency.exponentialRampToValueAtTime(40, now + 0.3); gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3); osc.start(now); osc.stop(now + 0.3); }
    } catch {}
  };

  useEffect(() => { const saved = localStorage.getItem("minigame_highscore"); if (saved) setHighScore(parseInt(saved, 10)); }, []);

  const reqIdRef = useRef<number | null>(null);
  const playerRef = useRef({ x: 60, y: 180, width: 32, height: 38, vy: 0, gravity: 0.75, jumpStrength: -13, isGrounded: true, doubleJumpAvailable: true });
  const obstaclesRef = useRef<Obstacle[]>([]); const itemsRef = useRef<Item[]>([]); const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0); const scoreRef = useRef(0); const speedRef = useRef(5);

  const jump = () => {
    const p = playerRef.current;
    if (p.isGrounded) { p.vy = p.jumpStrength; p.isGrounded = false; p.doubleJumpAvailable = true; playSound("jump"); createJumpDust(p.x + p.width/2, p.y + p.height); }
    else if (p.doubleJumpAvailable) { p.vy = p.jumpStrength*0.85; p.doubleJumpAvailable = false; playSound("jump"); createJumpDust(p.x + p.width/2, p.y + p.height); }
  };
  const createJumpDust = (x:number,y:number)=>{ for(let i=0;i<8;i++) particlesRef.current.push({x,y,vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*2-1,size:Math.random()*4+2,color:"#e8a020",alpha:0.8,life:15}); };
  const createCollectSparkles = (x:number,y:number,color:string)=>{ for(let i=0;i<12;i++) particlesRef.current.push({x,y,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6,size:Math.random()*5+3,color,alpha:1,life:25}); };

  const startGame = () => {
    const canvas = canvasRef.current; if(!canvas) return;
    playerRef.current = { x:60, y:canvas.height-78, width:32, height:38, vy:0, gravity:0.75, jumpStrength:-13, isGrounded:true, doubleJumpAvailable:true };
    obstaclesRef.current=[]; itemsRef.current=[]; particlesRef.current=[]; frameCountRef.current=0; scoreRef.current=0; speedRef.current=5.5;
    setScore(0); setGameState("playing");
  };

  useEffect(()=>{
    if(gameState!=="playing") return;
    const canvas=canvasRef.current; if(!canvas) return; const ctx=canvas.getContext("2d"); if(!ctx) return;
    const groundY=canvas.height-40;
    const isDark=document.documentElement.classList.contains("dark");
    const getAmber=()=> getComputedStyle(document.documentElement).getPropertyValue("--amber").trim() || "#e8a020";
    const getInk=()=> getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#0f0d0a";
    const getBorder=()=> getComputedStyle(document.documentElement).getPropertyValue("--border").trim() || "#d4cfc6";
    const handleKeyDown=(e:KeyboardEvent)=>{ if(e.code==="Space"||e.code==="ArrowUp"||e.code==="KeyW"){ e.preventDefault(); jump(); } };
    window.addEventListener("keydown",handleKeyDown);
    const loop=()=>{
      frameCountRef.current++; const frame=frameCountRef.current;
      speedRef.current=5.5+Math.floor(scoreRef.current/100)*0.4;
      const paperDim=isDark?"#1a1714":"#ebe8e1"; const border=getBorder();
      ctx.fillStyle=paperDim; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle=border; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(0,groundY); ctx.lineTo(canvas.width,groundY); ctx.stroke();
      const offset=(frame*speedRef.current)%30; ctx.strokeStyle=isDark?"#2a2620":"#d4cfc6"; ctx.lineWidth=1;
      for(let x=-offset;x<canvas.width;x+=30){ ctx.beginPath(); ctx.moveTo(x,groundY); ctx.lineTo(x-18,canvas.height); ctx.stroke(); }
      const p=playerRef.current; p.vy+=p.gravity; p.y+=p.vy; if(p.y>=groundY-p.height){ p.y=groundY-p.height; p.vy=0; p.isGrounded=true; }
      const amber=getAmber();
      ctx.save(); ctx.fillStyle=amber;
      const rr: any = ctx; if(rr.roundRect) rr.roundRect(p.x,p.y,p.width,p.height,6); else ctx.fillRect(p.x,p.y,p.width,p.height); ctx.fill();
      ctx.fillStyle=isDark?"#100e0b":"#ffffff"; ctx.fillRect(p.x+8,p.y+8,16,8); ctx.fillStyle=amber; ctx.fillRect(p.x+(p.vy<0?10:18),p.y+10,4,4);
      if(!p.isGrounded){ ctx.fillStyle=amber; ctx.globalAlpha=0.5; ctx.fillRect(p.x+4,p.y+p.height,8,Math.random()*8+4); } ctx.restore();
      if(frame%Math.max(50,Math.floor(1000/(speedRef.current*2)))===0 && Math.random()<0.7){
        const isSpike=Math.random()>0.4; const height=isSpike?Math.random()*30+35:30; const width=isSpike?18:30;
        const y=isSpike?groundY-height:groundY-(Math.random()<0.3?80:height);
        obstaclesRef.current.push({x:canvas.width,y,width,height,type:isSpike?"bug_spike":"glitch_block",passed:false});
      }
      if(frame%80===0 && Math.random()>0.3){
        const isCoin=Math.random()>0.5; const yPos=groundY-(Math.random()*70+40);
        itemsRef.current.push({x:canvas.width,y:yPos,width:20,height:20,type:isCoin?"code_coin":"code_chip",collected:false});
      }
      for(let i=obstaclesRef.current.length-1;i>=0;i--){
        const obs=obstaclesRef.current[i]; obs.x-=speedRef.current;
        ctx.save();
        if(obs.type==="bug_spike"){ ctx.fillStyle=isDark?"#a8640a":"#8a3a0a"; ctx.fillRect(obs.x,obs.y,obs.width,obs.height); ctx.strokeStyle=isDark?"#a8640a":"#8a3a0a"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(obs.x+obs.width/2,obs.y-6); ctx.lineTo(obs.x+obs.width/2,obs.y+obs.height+6); ctx.stroke(); }
        else { ctx.strokeStyle=getInk(); ctx.lineWidth=1.5; ctx.strokeRect(obs.x,obs.y,obs.width,obs.height); ctx.fillStyle=getInk(); ctx.globalAlpha=0.12; ctx.fillRect(obs.x+4,obs.y+4,obs.width-8,obs.height-8); ctx.globalAlpha=1; }
        ctx.restore();
        if(p.x<obs.x+obs.width && p.x+p.width>obs.x && p.y<obs.y+obs.height && p.y+p.height>obs.y){ playSound("hit"); setGameState("gameover"); if(scoreRef.current>highScore){ setHighScore(scoreRef.current); localStorage.setItem("minigame_highscore",scoreRef.current.toString()); } return; }
        if(!obs.passed && obs.x+obs.width<p.x){ obs.passed=true; scoreRef.current+=5; setScore(scoreRef.current); }
        if(obs.x+obs.width<-20) obstaclesRef.current.splice(i,1);
      }
      for(let i=itemsRef.current.length-1;i>=0;i--){
        const item=itemsRef.current[i]; item.x-=speedRef.current;
        ctx.save();
        if(item.type==="code_chip"){ ctx.fillStyle=amber; ctx.fillRect(item.x,item.y,item.width,item.height); ctx.strokeStyle=amber; ctx.beginPath(); ctx.moveTo(item.x+item.width/2,item.y-3); ctx.lineTo(item.x+item.width/2,item.y+item.height+3); ctx.stroke(); }
        else { ctx.fillStyle=amber; ctx.beginPath(); ctx.moveTo(item.x+item.width/2,item.y); ctx.lineTo(item.x+item.width,item.y+item.height/2); ctx.lineTo(item.x+item.width/2,item.y+item.height); ctx.lineTo(item.x,item.y+item.height/2); ctx.closePath(); ctx.fill(); }
        ctx.restore();
        if(!item.collected && p.x<item.x+item.width && p.x+p.width>item.x && p.y<item.y+item.height && p.y+p.height>item.y){ item.collected=true; const pts=item.type==="code_coin"?25:10; scoreRef.current+=pts; setScore(scoreRef.current); playSound("coin"); createCollectSparkles(item.x,item.y,amber); itemsRef.current.splice(i,1); continue; }
        if(item.x+item.width<-20) itemsRef.current.splice(i,1);
      }
      for(let i=particlesRef.current.length-1;i>=0;i--){ const pt=particlesRef.current[i]; pt.x+=pt.vx; pt.y+=pt.vy; pt.life--; pt.alpha=pt.life/25; ctx.save(); ctx.globalAlpha=Math.max(0,pt.alpha); ctx.fillStyle=pt.color; ctx.beginPath(); ctx.arc(pt.x,pt.y,pt.size,0,Math.PI*2); ctx.fill(); ctx.restore(); if(pt.life<=0) particlesRef.current.splice(i,1); }
      reqIdRef.current=requestAnimationFrame(loop);
    };
    reqIdRef.current=requestAnimationFrame(loop);
    return()=>{ window.removeEventListener("keydown",handleKeyDown); if(reqIdRef.current) cancelAnimationFrame(reqIdRef.current); };
  },[gameState,highScore,soundEnabled]);

  return (
    <div className="w-full rounded-[24px] overflow-hidden border border-[#d4cfc6] bg-[#f7f4ef]">
      <div className="flex items-center justify-between px-4 py-3 bg-[#f7f4ef] border-b border-[#d4cfc6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e8a020]" aria-hidden />
          <span className="text-xs font-mono uppercase tracking-widest text-[#0f0d0a]">Code Dodger</span>
          <span className="hidden sm:inline text-[11px] font-mono px-2 py-1 rounded-full bg-[#ebe8e1] border border-[#d4cfc6] text-[#0f0d0a]">Canvas · 60fps</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-mono text-[#6b6560] flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-[#e8a020]" />{t("game.highScore")}: {highScore}</span>
          <button onClick={()=>setSoundEnabled(!soundEnabled)} className="w-8 h-8 rounded-full border border-[#d4cfc6] bg-[#f7f4ef] text-[#0f0d0a] flex items-center justify-center hover:border-[#e8a020] hover:text-[#e8a020] transition-colors" aria-label="Toggle Sound">{soundEnabled?<Volume2 className="w-3.5 h-3.5"/>:<VolumeX className="w-3.5 h-3.5"/>}</button>
          <button onClick={()=>setShowTooltip(!showTooltip)} className="w-8 h-8 rounded-full border border-[#d4cfc6] bg-[#f7f4ef] text-[#0f0d0a] flex items-center justify-center hover:border-[#e8a020] hover:text-[#e8a020] transition-colors" aria-label="How to play"><HelpCircle className="w-3.5 h-3.5"/></button>
        </div>
      </div>
      {showTooltip && (
        <div className="px-4 py-3 bg-[#e8a020] text-black text-xs font-mono flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div><p className="font-bold">{t("game.howToPlay")}:</p><p>{t("game.instructions")}</p></div>
        </div>
      )}
      <div className="relative w-full aspect-[16/7] min-h-[220px] max-h-[320px] bg-[#ebe8e1] cursor-pointer select-none touch-none overflow-hidden" onClick={()=>{ if(gameState==="playing") jump(); }} role="application" aria-label="Code Dodger game area — press Space or tap to jump">
        <canvas ref={canvasRef} width={768} height={280} className="w-full h-full block" role="img" aria-label="Code Dodger canvas — dodge glitch blocks and collect code gems" />
        {gameState==="playing" && <div className="absolute top-3 left-3 bg-[#0f0d0a] text-[#f7f4ef] rounded-full px-3 py-1 text-xs font-mono">{t("game.score")}: {score}</div>}
        {gameState==="idle" && (
          <div className="absolute inset-0 bg-[#f7f4ef]/90 flex flex-col items-center justify-center p-6 text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8a020] flex items-center justify-center"><Sparkles className="w-6 h-6 text-black" /></div>
            <div><h3 className="text-lg font-black tracking-tight text-[#0f0d0a]">{t("game.title")}</h3><p className="text-xs font-mono text-[#6b6560] max-w-md">{t("game.subtitle")}</p></div>
            <button onClick={startGame} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f0d0a] text-[#f7f4ef] text-xs font-mono hover:bg-[#e8a020] hover:text-black transition-colors"><Play className="w-3.5 h-3.5 fill-current" /><span>{t("game.start")}</span></button>
          </div>
        )}
        {gameState==="gameover" && (
          <div className="absolute inset-0 bg-[#f7f4ef]/90 flex flex-col items-center justify-center p-6 text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#d4cfc6] bg-white flex items-center justify-center"><Trophy className="w-6 h-6 text-[#0f0d0a]" /></div>
            <div><h3 className="text-xl font-black text-[#0f0d0a]">{t("game.gameOver")}</h3><div className="flex gap-4 justify-center text-xs font-mono mt-2"><span className="text-[#0f0d0a]">{t("game.score")}: <b>{score}</b></span><span className="text-[#0f0d0a]">{t("game.highScore")}: <b className="text-[#e8a020]">{highScore}</b></span></div></div>
            <button onClick={startGame} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f0d0a] text-[#f7f4ef] text-xs font-mono hover:bg-[#e8a020] hover:text-black transition-colors"><RotateCcw className="w-3.5 h-3.5" /><span>{t("game.restart")}</span></button>
          </div>
        )}
      </div>
      <div className="sm:hidden px-4 py-2 bg-[#f7f4ef] border-t border-[#d4cfc6] text-center text-xs font-mono flex justify-between"><span className="text-[#0f0d0a]">Tap to jump</span><span className="text-[#6b6560]">60 FPS</span></div>
    </div>
  );
}
