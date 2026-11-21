"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  ArrowRight, BarChart3, Check, ChevronLeft, ChevronRight, Code2, FileText,
  LayoutTemplate, Megaphone, PenTool, RotateCcw, Search, ShoppingCart,
} from "lucide-react";
import { designPreview } from "@/lib/design-media";
import { groups, type Tool } from "./tools";
import styles from "./stack.module.css";

const icons = { Search, FileText, Code2, LayoutTemplate, PenTool, Megaphone, ShoppingCart, BarChart3 };

function Logo({ tool }: { tool: Tool }) {
  const [src, setSrc] = useState(designPreview(tool.logo).src);
  return (
    <span className={styles.logo} aria-hidden="true">
      {src === "" ? tool.name.split(" ").slice(0, 2).map((word) => word[0]).join("") : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} width={42} height={42} alt="" onError={() => setSrc(src === tool.fallback ? "" : tool.fallback)} />
      )}
    </span>
  );
}

export default function TechnologyStack() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [toolIndex, setToolIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const group = groups[groupIndex];
  const tool = group.tools[toolIndex];
  const CategoryIcon = icons[group.icon];

  function selectGroup(index: number) {
    if (index === groupIndex) return;
    setGroupIndex(index);
    setToolIndex(0);
    setAngle(0);
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty("--pointer-x", `${((event.clientX - left) / width - 0.5) * 22}deg`);
    scene.current?.style.setProperty("--pointer-y", `${((event.clientY - top) / height - 0.5) * -16}deg`);
  }

  function resetTilt() {
    scene.current?.style.removeProperty("--pointer-x");
    scene.current?.style.removeProperty("--pointer-y");
  }

  return (
    <section className={styles.section} aria-labelledby="technology-stack-title">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Technology stack</p>
          <h2 id="technology-stack-title">The tools <span>behind the work</span></h2>
          <p>See what we use to research, build, and measure your project, and what each tool helps us deliver.</p>
        </header>

        <div className={styles.workspace}>
          <div className={styles.categories} role="group" aria-label="Technology categories">
            {groups.map(({ name, icon }, index) => {
              const Icon = icons[icon];
              return (
                <button key={name} type="button" className={styles.category}
                  aria-pressed={index === groupIndex} onClick={() => selectGroup(index)}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{name}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className={styles.panel}>
            <div className={styles.tools} role="group" aria-label={`${group.name} tools`}>
              {group.tools.map((item, index) => (
                <button key={item.name} type="button" className={styles.tool}
                  aria-pressed={index === toolIndex} onClick={() => setToolIndex(index)}>
                  <Logo key={item.logo} tool={item} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <div className={styles.showcase}>
              <div className={styles.detail} aria-live="polite" aria-atomic="true">
                <div key={tool.name} className={styles.reveal}>
                  <h3><CategoryIcon size={25} aria-hidden="true" />{tool.name}</h3>
                  <p>{tool.use}</p>
                  <div className={styles.output}>
                    <Check size={18} aria-hidden="true" />
                    <div><strong>What you get</strong><p>{tool.result}</p></div>
                  </div>
                </div>
              </div>

              <div className={styles.preview}>
                <div className={styles.stage} onPointerMove={tilt} onPointerLeave={resetTilt}>
                  <div className={styles.scene} ref={scene} aria-hidden="true">
                    <div className={styles.object} style={{ transform: `rotateX(12deg) rotateY(${angle - 18}deg)` }}>
                      <span className={styles.rear} />
                      <span className={styles.middle} />
                      <span className={styles.front}>
                        <span className={styles.reveal} key={tool.name}><Logo tool={tool} /></span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.controls} role="group" aria-label="3D preview controls">
                  <button type="button" aria-label="Rotate preview left" onClick={() => setAngle((value) => Math.max(-45, value - 15))}>
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Reset preview angle" onClick={() => setAngle(0)}>
                    <RotateCcw size={15} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Rotate preview right" onClick={() => setAngle((value) => Math.min(75, value + 15))}>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
