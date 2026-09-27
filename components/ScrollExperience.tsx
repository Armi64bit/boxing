'use client';

import { useEffect, useRef, useState } from 'react';
import { LiquidGlass } from './LiquidGlass';

const scenes = [
  {
    id: 'intro',
    kicker: 'ONE AI TREND',
    title: 'And suddenly…\nI think I can box.',
    body: 'A tiny scroll. A cinematic punch. And apparently I am now a boxer. 🥊',
    stat: '01 / 05',
    side: 'THE SETUP',
  },
  {
    id: 'stance',
    kicker: 'STANCE',
    title: 'Guard up.\nConfidence optional.',
    body: 'The animation follows your scroll, turning each movement into a new frame of the story.',
    stat: '02 / 05',
    side: 'BODY MECHANICS',
  },
  {
    id: 'motion',
    kicker: 'MOTION',
    title: 'Rotation creates\nthe punch.',
    body: 'Shoulders, hips and momentum become the visual language of the page.',
    stat: '03 / 05',
    side: 'KINETIC TYPE',
  },
  {
    id: 'impact',
    kicker: 'IMPACT',
    title: 'Scroll harder.\nHit harder.',
    body: 'The glass cards drift, scale and blur while the video scrubs underneath them.',
    stat: '04 / 05',
    side: 'LIQUID GLASS',
  },
  {
    id: 'outro',
    kicker: 'RESULT',
    title: 'Okay…\nmaybe I can box.',
    body: 'Built with Next.js, a scroll-driven video timeline, and a liquid-glass visual system.',
    stat: '05 / 05',
    side: 'END FRAME',
  },
];

export function ScrollExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const stage = stageRef.current;
        const video = videoRef.current;
        if (!stage) return;

        const rect = stage.getBoundingClientRect();
        const max = Math.max(1, stage.offsetHeight - window.innerHeight);
        const raw = Math.min(1, Math.max(0, -rect.top / max));
        setProgress(raw);
        setActive(Math.min(scenes.length - 1, Math.floor(raw * scenes.length)));

        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = raw * video.duration;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const sceneProgress = (progress * scenes.length) % 1;

  return (
    <main>
      <section className="hero">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__eyebrow">SCROLL EXPERIENCE / 001</div>
          <h1>AI made me<br /><span>think I can box.</span></h1>
          <p>Scroll to control the punch.</p>
          <div className="scroll-cue"><span /> SCROLL</div>
        </div>
      </section>

      <section ref={stageRef} className="story-stage">
        <div className="sticky-stage">
          <video
            ref={videoRef}
            className="boxing-video"
            src="/boxing.mp4"
            muted
            playsInline
            preload="auto"
            aria-label="AI generated boxing animation"
          />
          <div className="video-vignette" />
          <div className="progress-line"><span style={{ transform: `scaleY(${progress})` }} /></div>
          <div className="scene-index">{String(active + 1).padStart(2, '0')} <i>/</i> {String(scenes.length).padStart(2, '0')}</div>

          <div className="story-copy">
            {scenes.map((scene, index) => {
              const local = index === active ? sceneProgress : index < active ? 1 : 0;
              const opacity = index === active ? 1 : 0;
              const translate = index === active ? (1 - local) * 34 : index < active ? -42 : 42;
              return (
                <div
                  key={scene.id}
                  className="scene"
                  style={{ opacity, transform: `translate3d(0, ${translate}px, 0)` }}
                  aria-hidden={index !== active}
                >
                  <div className="scene__side">{scene.side}</div>
                  <LiquidGlass eyebrow={scene.kicker} label={scene.stat}>
                    <h2>{scene.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
                    <p>{scene.body}</p>
                  </LiquidGlass>
                </div>
              );
            })}
          </div>

          <div className="bottom-chip">
            <span className="dot" /> LIQUID GLASS / SCROLL CONTROL
          </div>
        </div>
      </section>

      <section className="afterword">
        <LiquidGlass className="afterword__card" eyebrow="BUILT FOR THE WEB" label="BOXING">
          <h2>One video.<br />Five moments.</h2>
          <p>The page turns a short AI boxing clip into a cinematic scroll interaction. The video stays locked to the viewport while text and glass surfaces respond to your position.</p>
          <div className="tech-row"><span>Next.js</span><span>TypeScript</span><span>Scroll Timeline</span><span>Liquid Glass</span></div>
        </LiquidGlass>
      </section>
    </main>
  );
}
