"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/audio/highest-in-the-room.mp3`;
const TARGET_VOLUME = 0.32;
/** The track starts from the beginning. */
const START_AT_SECONDS = 0;

/**
 * One audio element, one source of truth.
 *
 * Browsers only allow audible autoplay after the visitor has interacted with
 * the page (Chrome, Safari, Firefox and mobile browsers all enforce this).
 * The strategy is therefore:
 *
 *  1. Start the track muted immediately — muted autoplay is always allowed —
 *     so it has a silent head-start.
 *  2. Try to unmute right away. Some browsers and returning visitors allow it.
 *  3. If unmuting is blocked, the first tap, click or key press anywhere on the
 *     page unmutes the already-running track instantly, without touching the
 *     music button.
 *  4. The floating control remains available for pausing and resuming.
 *  5. Playback starts from the beginning and loops back to the beginning
 *     every time.
 */
export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const gestureCleanup = useRef<(() => void) | null>(null);
  const gestureDetected = useRef(false);
  const userPaused = useRef(false);
  const hasSoughtStart = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeTimer.current) window.clearInterval(fadeTimer.current);
    fadeTimer.current = window.setInterval(() => {
      const current = audioRef.current;
      if (!current) return;

      const difference = target - current.volume;
      if (Math.abs(difference) < 0.02) {
        current.volume = target;
        if (fadeTimer.current) {
          window.clearInterval(fadeTimer.current);
          fadeTimer.current = null;
        }
        return;
      }

      current.volume = Math.min(1, Math.max(0, current.volume + difference * 0.22));
    }, 55);
  }, []);

  /** True only when sound is actually audible. */
  const syncAudibleState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(!audio.paused && !audio.muted && !audio.ended);
  }, []);

  const isAudible = useCallback(() => {
    const audio = audioRef.current;
    return !!audio && !audio.paused && !audio.muted && !audio.ended;
  }, []);

  /** Respect very short replacement tracks while defaulting to the start. */
  const getStartTime = useCallback(() => {
    const duration = audioRef.current?.duration;
    if (!duration || !Number.isFinite(duration)) return START_AT_SECONDS;
    return duration > START_AT_SECONDS + 2 ? START_AT_SECONDS : 0;
  }, []);

  /* Seek to the beginning once the file can accept a currentTime. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const applyStart = () => {
      if (hasSoughtStart.current || audio.readyState < 1) return;
      try {
        audio.currentTime = getStartTime();
        hasSoughtStart.current = true;
      } catch {
        // Some browsers need one more loadedmetadata tick.
      }
    };

    applyStart();
    audio.addEventListener("loadedmetadata", applyStart);
    return () => audio.removeEventListener("loadedmetadata", applyStart);
  }, [getStartTime]);

  const startUnmuted = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      if (audio.paused) {
        const attempt = audio.play();
        if (attempt) await attempt;
      }
      fadeTo(TARGET_VOLUME);
      syncAudibleState();
      return true;
    } catch {
      return false;
    }
  }, [fadeTo, syncAudibleState]);

  /** Silent playback is always allowed and gives the track a head start. */
  const startMuted = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 0;
      const attempt = audio.play();
      if (attempt) await attempt;
      syncAudibleState();
      return true;
    } catch {
      return false;
    }
  }, [syncAudibleState]);

  /* Start silently, try to unmute, and unlock on the first interaction. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    audio.volume = 0;

    const removeGestureListeners = () => {
      gestureCleanup.current?.();
      gestureCleanup.current = null;
    };

    const unlock = (event: Event) => {
      const target = event.target as HTMLElement | null;
      // The music button handles its own clicks; unlocking here as well would
      // start playback and then the click would immediately pause it.
      if (target?.closest("#music-toggle")) return;
      if (userPaused.current) return;

      gestureDetected.current = true;
      void startUnmuted().then((ok) => {
        if (!ok || cancelled) return;
        setNeedsGesture(false);
        setShowHint(false);
        removeGestureListeners();
      });
    };

    const attachGestureListeners = () => {
      if (gestureCleanup.current) return;

      const events: Array<keyof WindowEventMap> = [
        "pointerdown",
        "pointerup",
        "touchend",
        "click",
        "keydown",
      ];
      events.forEach((name) =>
        window.addEventListener(name, unlock, { passive: true }),
      );
      gestureCleanup.current = () => {
        events.forEach((name) => window.removeEventListener(name, unlock));
      };
    };

    const attemptAutoplay = async () => {
      // Listen from the very first moment, in case the visitor interacts while
      // the autoplay attempt is still pending.
      attachGestureListeners();

      // Try audible autoplay first. If the browser allows it, we are done.
      await startUnmuted();
      if (cancelled) return;

      if (isAudible()) {
        removeGestureListeners();
        setNeedsGesture(false);

        // Some browsers resolve play() and then silently suspend the element.
        window.setTimeout(() => {
          if (cancelled || userPaused.current || isAudible()) return;
          void startMuted();
        }, 900);
        return;
      }

      // A real gesture arrived while we were trying — let that attempt win.
      if (gestureDetected.current) {
        setNeedsGesture(true);
        setShowHint(true);
        return;
      }

      // Audible autoplay is blocked. Start silently: muted playback is always
      // allowed and gives the track a head start before the first interaction.
      await startMuted();
      if (cancelled) return;
      setNeedsGesture(true);
      setShowHint(true);
    };

    void attemptAutoplay();

    const onPause = () => {
      if (userPaused.current) return;
      // A browser-initiated pause means the next interaction should try again.
      attachGestureListeners();
    };

    /* Loop from the beginning. */
    const onEnded = () => {
      if (userPaused.current) return;
      const current = audioRef.current;
      if (!current) return;
      try {
        current.currentTime = getStartTime();
      } catch {
        return;
      }
      const attempt = current.play();
      if (attempt) void attempt.catch(() => undefined);
      fadeTo(TARGET_VOLUME);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible" || userPaused.current) return;
      const current = audioRef.current;
      if (!current || !current.paused) return;
      void startMuted();
    };

    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      removeGestureListeners();
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (fadeTimer.current) window.clearInterval(fadeTimer.current);
      audio.pause();
    };
  }, [fadeTo, getStartTime, isAudible, startMuted, startUnmuted]);

  /* Keep UI state in sync with the real element (play, pause and mute). */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("play", syncAudibleState);
    audio.addEventListener("pause", syncAudibleState);
    audio.addEventListener("volumechange", syncAudibleState);

    return () => {
      audio.removeEventListener("play", syncAudibleState);
      audio.removeEventListener("pause", syncAudibleState);
      audio.removeEventListener("volumechange", syncAudibleState);
    };
  }, [syncAudibleState]);

  /* Only advertise the fallback while autoplay is genuinely blocked. */
  useEffect(() => {
    if (playing || !needsGesture) {
      setShowHint(false);
      return;
    }
    const timer = window.setTimeout(() => setShowHint(true), 1400);
    return () => window.clearTimeout(timer);
  }, [needsGesture, playing]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused && !audio.muted) {
      userPaused.current = true;
      audio.pause();
      return;
    }

    userPaused.current = false;
    void startUnmuted().then((ok) => {
      if (ok) setNeedsGesture(false);
    });
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        playsInline
        aria-hidden="true"
      />

      <div
        className="audio-dock fixed z-[120] flex items-center gap-2.5"
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <button
          id="music-toggle"
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          className={cn(
            "group relative flex h-12 w-12 items-center justify-center rounded-full border text-paper shadow-[0_16px_40px_-14px_rgba(0,0,0,0.75)] transition-all duration-300",
            "border-paper/15 bg-navy/85 backdrop-blur-md hover:-translate-y-0.5 hover:border-orange/50 hover:bg-navy",
            !playing && showHint && "music-pulse",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-1 rounded-full border border-paper/[0.06]"
          />

          {playing ? (
            <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
              <span className="eq-bar h-2" />
              <span className="eq-bar h-4" />
              <span className="eq-bar h-3" />
            </span>
          ) : (
            <VolumeX className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
          )}
        </button>

        <span
          aria-live="polite"
          className={cn(
            "mono hidden rounded-full border border-paper/10 bg-navy/80 px-3 py-2 text-[0.54rem] tracking-[0.16em] text-paper/60 shadow-lg backdrop-blur-md transition-all duration-500 sm:block",
            showHint || playing
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-1 opacity-0",
          )}
        >
          {playing ? "Music on" : "Tap anywhere for sound"}
        </span>
      </div>
    </>
  );
}
