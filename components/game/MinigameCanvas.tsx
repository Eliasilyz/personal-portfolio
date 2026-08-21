"use client"

import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX, HelpCircle, Trophy, Sparkles } from "lucide-react";
import { useLanguage } from "../../lib/LanguageProvider";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "red_candle" | "glitch_block";
  passed: boolean;
}

interface Item {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "green_candle" | "code_coin";
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export default function MinigameCanvas() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // Sound synthesis using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (type: "jump" | "coin" | "hit") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "jump") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "coin") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (err) {
      // AudioContext might be blocked or unsupported
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("minigame_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Game Engine Refs
  const reqIdRef = useRef<number | null>(null);
  const playerRef = useRef({
    x: 60,
    y: 180,
    width: 32,
    height: 38,
    vy: 0,
    gravity: 0.75,
    jumpStrength: -13,
    isGrounded: true,
    doubleJumpAvailable: true,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const itemsRef = useRef<Item[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const scoreRef = useRef(0);
  const speedRef = useRef(5);

  const jump = () => {
    const p = playerRef.current;
    if (p.isGrounded) {
      p.vy = p.jumpStrength;
      p.isGrounded = false;
      p.doubleJumpAvailable = true;
      playSound("jump");
      createJumpDust(p.x + p.width / 2, p.y + p.height);
    } else if (p.doubleJumpAvailable) {
      p.vy = p.jumpStrength * 0.85;
      p.doubleJumpAvailable = false;
      playSound("jump");
      createJumpDust(p.x + p.width / 2, p.y + p.height);
    }
  };

  const createJumpDust = (x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 2 - 1,
        size: Math.random() * 4 + 2,
        color: "#10b981",
        alpha: 0.8,
        life: 15,
      });
    }
  };

  const createCollectSparkles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 12; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: Math.random() * 5 + 3,
        color,
        alpha: 1,
        life: 25,
      });
    }
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    playerRef.current = {
      x: 60,
      y: canvas.height - 78,
      width: 32,
      height: 38,
      vy: 0,
      gravity: 0.75,
      jumpStrength: -13,
      isGrounded: true,
      doubleJumpAvailable: true,
    };

    obstaclesRef.current = [];
    itemsRef.current = [];
    particlesRef.current = [];
    frameCountRef.current = 0;
    scoreRef.current = 0;
    speedRef.current = 5.5;

    setScore(0);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const groundY = canvas.height - 40;
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const loop = () => {
      frameCountRef.current++;
      const frame = frameCountRef.current;

      // Increase game speed slightly over time
      speedRef.current = 5.5 + Math.floor(scoreRef.current / 100) * 0.4;

      // Clear Canvas
      ctx.fillStyle = isDark ? "#0f172a" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid / Floor
      ctx.strokeStyle = isDark ? "#334155" : "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Floor grid lines motion
      const offset = (frame * speedRef.current) % 30;
      ctx.strokeStyle = isDark ? "#1e293b" : "#cbd5e1";
      ctx.lineWidth = 1;
      for (let x = -offset; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 20, canvas.height);
        ctx.stroke();
      }

      // Update Player
      const p = playerRef.current;
      p.vy += p.gravity;
      p.y += p.vy;

      if (p.y >= groundY - p.height) {
        p.y = groundY - p.height;
        p.vy = 0;
        p.isGrounded = true;
      }

      // Draw Player (Farel's Code Bot / Trader Icon)
      ctx.save();
      ctx.fillStyle = "#10b981"; // Emerald green
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 6);
      ctx.fill();

      // Bot Eye / Screen
      ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
      ctx.fillRect(p.x + 8, p.y + 8, 16, 8);
      ctx.fillStyle = "#3b82f6"; // Blue glowing eyes
      ctx.fillRect(p.x + (p.vy < 0 ? 10 : 18), p.y + 10, 4, 4);

      // Jetpack trail when jumping
      if (!p.isGrounded) {
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(p.x + 4, p.y + p.height, 8, Math.random() * 8 + 4);
      }
      ctx.restore();

      // Spawn Obstacles (Red Candles & Glitch Blocks)
      if (frame % Math.max(50, Math.floor(1000 / (speedRef.current * 2))) === 0) {
        if (Math.random() < 0.7) {
          const isCandle = Math.random() > 0.4;
          const height = isCandle ? Math.random() * 30 + 35 : 30;
          const width = isCandle ? 18 : 30;
          const y = isCandle ? groundY - height : groundY - (Math.random() < 0.3 ? 80 : height);

          obstaclesRef.current.push({
            x: canvas.width,
            y,
            width,
            height,
            type: isCandle ? "red_candle" : "glitch_block",
            passed: false,
          });
        }
      }

      // Spawn Collectibles (Green Candles & Code Coins)
      if (frame % 80 === 0 && Math.random() > 0.3) {
        const isCoin = Math.random() > 0.5;
        const yPos = groundY - (Math.random() * 70 + 40);
        itemsRef.current.push({
          x: canvas.width,
          y: yPos,
          width: 20,
          height: 20,
          type: isCoin ? "code_coin" : "green_candle",
          collected: false,
        });
      }

      // Update & Draw Obstacles
      for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i];
        obs.x -= speedRef.current;

        // Draw Obstacle
        ctx.save();
        if (obs.type === "red_candle") {
          ctx.fillStyle = "#ef4444"; // Red dump candle
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 8;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

          // Candle Wick
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.width / 2, obs.y - 8);
          ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height + 8);
          ctx.stroke();
        } else {
          // Glitch Block
          ctx.fillStyle = "#8b5cf6"; // Purple glitch
          ctx.shadowColor = "#8b5cf6";
          ctx.shadowBlur = 8;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = "#f43f5e";
          ctx.fillRect(obs.x + 4, obs.y + 4, obs.width - 8, obs.height - 8);
        }
        ctx.restore();

        // Check Collision with Player
        if (
          p.x < obs.x + obs.width &&
          p.x + p.width > obs.x &&
          p.y < obs.y + obs.height &&
          p.y + p.height > obs.y
        ) {
          // GAME OVER
          playSound("hit");
          setGameState("gameover");
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem("minigame_highscore", scoreRef.current.toString());
          }
          return;
        }

        // Increment Score when safely passed
        if (!obs.passed && obs.x + obs.width < p.x) {
          obs.passed = true;
          scoreRef.current += 5;
          setScore(scoreRef.current);
        }

        // Remove offscreen
        if (obs.x + obs.width < -20) {
          obstaclesRef.current.splice(i, 1);
        }
      }

      // Update & Draw Items
      for (let i = itemsRef.current.length - 1; i >= 0; i--) {
        const item = itemsRef.current[i];
        item.x -= speedRef.current;

        ctx.save();
        if (item.type === "green_candle") {
          ctx.fillStyle = "#10b981";
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 8;
          ctx.fillRect(item.x, item.y, item.width, item.height);
          ctx.strokeStyle = "#10b981";
          ctx.beginPath();
          ctx.moveTo(item.x + item.width / 2, item.y - 4);
          ctx.lineTo(item.x + item.width / 2, item.y + item.height + 4);
          ctx.stroke();
        } else {
          // Code Coin Diamond
          ctx.fillStyle = "#f59e0b";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(item.x + item.width / 2, item.y);
          ctx.lineTo(item.x + item.width, item.y + item.height / 2);
          ctx.lineTo(item.x + item.width / 2, item.y + item.height);
          ctx.lineTo(item.x, item.y + item.height / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Check Collect
        if (
          !item.collected &&
          p.x < item.x + item.width &&
          p.x + p.width > item.x &&
          p.y < item.y + item.height &&
          p.y + p.height > item.y
        ) {
          item.collected = true;
          const pts = item.type === "code_coin" ? 25 : 10;
          scoreRef.current += pts;
          setScore(scoreRef.current);
          playSound("coin");
          createCollectSparkles(item.x, item.y, item.type === "code_coin" ? "#f59e0b" : "#10b981");
          itemsRef.current.splice(i, 1);
          continue;
        }

        if (item.x + item.width < -20) {
          itemsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        pt.alpha = pt.life / 25;

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (pt.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [gameState, highScore, soundEnabled]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-2xl transition-all">
      {/* Game Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-sm">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-100 tracking-wide">Market Dodger</span>
          <span className="hidden sm:inline text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            HTML5 Canvas
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-amber-400 font-mono text-sm">
            <Trophy className="w-4 h-4" />
            <span>{t("game.highScore")}: {highScore}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Toggle Sound Effects"
              title="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="How to play instructions"
              title={t("game.howToPlay")}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip drawer */}
      {showTooltip && (
        <div className="px-4 py-3 bg-emerald-950/40 border-b border-emerald-800/50 text-xs text-emerald-200 flex items-start space-x-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{t("game.howToPlay")}:</p>
            <p>{t("game.instructions")}</p>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div
        className="relative w-full aspect-[16/7] min-h-[220px] max-h-[320px] bg-slate-900 cursor-pointer select-none touch-none flex items-center justify-center overflow-hidden"
        onClick={() => {
          if (gameState === "playing") jump();
        }}
      >
        <canvas
          ref={canvasRef}
          width={768}
          height={280}
          className="w-full h-full block"
        />

        {/* Live Score Counter overlay when playing */}
        {gameState === "playing" && (
          <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md border border-slate-800 rounded-xl px-4 py-1.5 text-emerald-400 font-mono text-lg font-bold shadow-lg">
            {t("game.score")}: {score}
          </div>
        )}

        {/* Idle Start Overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{t("game.title")}</h3>
              <p className="text-sm text-slate-400 max-w-md">{t("game.subtitle")}</p>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t("game.start")}</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-rose-400 mb-1">{t("game.gameOver")}</h3>
              <div className="flex items-center justify-center space-x-6 text-sm font-mono mt-2">
                <div className="text-slate-300">
                  {t("game.score")}: <span className="text-emerald-400 text-lg font-bold">{score}</span>
                </div>
                <div className="text-slate-300">
                  {t("game.highScore")}: <span className="text-amber-400 text-lg font-bold">{highScore}</span>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t("game.restart")}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch Control Bar */}
      <div className="sm:hidden px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between">
        <span>Tap screen to jump / double-jump</span>
        <span className="font-mono text-emerald-400">FPS: 60</span>
      </div>
    </div>
  );
}
