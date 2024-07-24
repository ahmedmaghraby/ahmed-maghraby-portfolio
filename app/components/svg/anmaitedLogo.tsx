import React, { useEffect, useState } from "react";
import gsap from "gsap";
import MorphSVGPlugin from "gsap-trial/MorphSVGPlugin";

import "./logo.css";
interface LogoProps {
  width?: number;
  height?: number;
}
gsap.registerPlugin(MorphSVGPlugin);
if (typeof document !== "undefined") {
  document.body.setAttribute("style", ""); // Next.js complains about the style attribute which ScrollTrigger affects during registration (even though it ends up empty, Next.js still compains that there's an attribute there at all. And it's not enough to just .removeAttribute() - it must be set to empty first).
  document.body.removeAttribute("style");
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    gsap.to("#circle", {
      duration: 4,
      morphSVG: "#path",
      repeatDelay: 0.2,
    });
    gsap
      .timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
        defaults: { ease: "none", duration: 1.5 },
      })
      .from("#centerGradient stop", { stopColor: "#f5d393" })
      .to("#circle", { attr: { stroke: "#e68e2e" } }, 0);

    setTimeout(() => {
      setIsMounted(true);
    }, 4000);
  }, []);
  return (
    <>
      <svg
        version="1.1"
        id="svg2"
        width={width}
        height={height}
        x="0px"
        y="0px"
        viewBox="9 80 800 400"
        className="relative"
      >
        <defs>
          <linearGradient id="centerGradient">
            <stop offset="0%" stopColor="#f5d393" />
            <stop offset="50%" stopColor="#f5d353" />
            <stop offset="100%" stopColor="#e68e2e" />
          </linearGradient>
        </defs>
        {isMounted && (
          <path
            className="absolute top-1/2 left-1/2 -translate-x-[2%] translate-y-[2%] opacity-20"
            id="shadow"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1"
            d="M 441.00,311.00            C 441.00,311.00 392.00,317.43 392.00,317.43              392.00,317.43 280.00,337.40 280.00,337.40              280.00,337.40 223.00,349.21 223.00,349.21              213.60,351.24 201.41,354.89 192.00,355.00              182.63,355.11 173.34,354.20 165.00,349.48              154.35,343.44 142.15,325.94 134.20,316.00              134.20,316.00 70.80,237.00 70.80,237.00              70.80,237.00 53.25,215.00 53.25,215.00              46.28,206.55 39.21,199.88 41.22,188.00              42.27,181.85 50.59,173.78 54.72,169.00              54.72,169.00 88.57,130.00 88.57,130.00              88.57,130.00 150.58,59.00 150.58,59.00              150.58,59.00 164.58,43.00 164.58,43.00              167.43,39.71 171.82,34.34 175.91,32.80              178.20,31.94 185.32,32.00 188.00,32.00              188.00,32.00 233.00,30.00 233.00,30.00              233.00,30.00 249.00,29.00 249.00,29.00              249.00,29.00 275.00,28.00 275.00,28.00              275.00,28.00 294.00,27.00 294.00,27.00              294.00,27.00 310.00,26.00 310.00,26.00              310.00,26.00 326.00,25.00 326.00,25.00              326.00,25.00 352.00,24.00 352.00,24.00              352.00,24.00 380.00,22.00 380.00,22.00              380.00,22.00 405.00,21.00 405.00,21.00              405.00,21.00 419.00,20.00 419.00,20.00              419.00,20.00 457.00,18.00 457.00,18.00              457.00,18.00 467.00,17.04 467.00,17.04              467.00,17.04 476.00,17.04 476.00,17.04              476.00,17.04 493.00,16.00 493.00,16.00              493.00,16.00 510.00,15.00 510.00,15.00              510.00,15.00 525.00,14.00 525.00,14.00              525.00,14.00 541.00,13.00 541.00,13.00              541.00,13.00 565.00,12.00 565.00,12.00              565.00,12.00 575.00,11.09 575.00,11.09              575.00,11.09 598.00,10.00 598.00,10.00              598.00,10.00 611.00,9.00 611.00,9.00              618.26,8.92 634.15,6.68 640.00,9.00              640.00,9.00 620.00,13.93 620.00,13.93              620.00,13.93 612.00,13.93 612.00,13.93              612.00,13.93 590.00,16.09 590.00,16.09              590.00,16.09 562.00,18.83 562.00,18.83              562.00,18.83 532.00,21.17 532.00,21.17              532.00,21.17 311.00,40.83 311.00,40.83              311.00,40.83 220.00,48.83 220.00,48.83              220.00,48.83 196.00,50.91 196.00,50.91              196.00,50.91 181.00,53.16 181.00,53.16              181.00,53.16 168.00,67.00 168.00,67.00              168.00,67.00 146.58,93.00 146.58,93.00              146.58,93.00 98.59,151.00 98.59,151.00              98.59,151.00 71.00,185.00 71.00,185.00              71.00,185.00 83.00,184.09 83.00,184.09              83.00,184.09 119.00,181.17 119.00,181.17              119.00,181.17 139.00,179.83 139.00,179.83              139.00,179.83 205.00,174.17 205.00,174.17              205.00,174.17 225.00,172.83 225.00,172.83              225.00,172.83 273.00,168.91 273.00,168.91              273.00,168.91 316.00,165.09 316.00,165.09              316.00,165.09 425.00,156.17 425.00,156.17              425.00,156.17 482.00,151.83 482.00,151.83              482.00,151.83 572.00,144.17 572.00,144.17              572.00,144.17 592.00,142.83 592.00,142.83              592.00,142.83 640.00,138.91 640.00,138.91              640.00,138.91 662.00,137.20 662.00,137.20              664.51,136.97 669.75,136.87 672.00,137.20              690.00,141.53 676.44,161.54 671.19,170.00              671.19,170.00 615.31,256.00 615.31,256.00              615.31,256.00 528.69,389.00 528.69,389.00              528.69,389.00 503.34,428.00 503.34,428.00              500.21,432.80 495.68,441.74 490.91,444.59              483.35,449.09 462.52,450.15 453.00,451.16              453.00,451.16 377.00,459.28 377.00,459.28              377.00,459.28 341.00,463.17 341.00,463.17              341.00,463.17 315.00,466.02 315.00,466.02              309.12,466.42 298.02,468.99 293.00,467.00              293.00,467.00 335.00,460.41 335.00,460.41              335.00,460.41 394.00,450.92 394.00,450.92              394.00,450.92 434.00,445.00 434.00,445.00              434.00,445.00 435.00,419.00 435.00,419.00              435.00,419.00 436.00,402.00 436.00,402.00              436.00,402.00 437.00,388.00 437.00,388.00              437.00,388.00 438.00,367.00 438.00,367.00              438.00,367.00 439.00,354.00 439.00,354.00              439.00,354.00 440.00,336.00 440.00,336.00              440.00,336.00 441.00,311.00 441.00,311.00 Z            M 448.00,442.00            C 448.00,442.00 470.00,438.75 470.00,438.75              474.28,438.04 479.24,437.51 482.90,435.01              486.50,432.55 492.26,422.17 494.80,418.00              494.80,418.00 517.68,381.00 517.68,381.00              517.68,381.00 608.95,234.00 608.95,234.00              608.95,234.00 642.40,180.00 642.40,180.00              644.78,176.06 653.62,164.74 650.22,160.51              647.41,157.01 641.73,158.64 638.00,158.91              638.00,158.91 605.00,161.91 605.00,161.91              605.00,161.91 518.00,169.83 518.00,169.83              518.00,169.83 485.00,172.83 485.00,172.83              485.00,172.83 464.00,175.00 464.00,175.00              464.00,175.00 462.09,207.00 462.09,207.00              462.09,207.00 458.91,263.00 458.91,263.00              458.91,263.00 457.00,286.00 457.00,286.00              457.00,286.00 457.00,295.00 457.00,295.00              457.00,295.00 456.00,304.00 456.00,304.00              456.00,304.00 473.00,304.00 473.00,304.00              473.00,304.00 489.00,303.00 489.00,303.00              489.00,303.00 503.00,303.00 503.00,303.00              503.00,303.00 518.00,304.00 518.00,304.00              525.67,304.01 529.47,303.51 537.00,306.00              537.00,306.00 517.00,305.01 517.00,305.01              517.00,305.01 508.00,305.96 508.00,305.96              508.00,305.96 496.00,305.96 496.00,305.96              496.00,305.96 456.00,309.00 456.00,309.00              456.00,309.00 455.00,318.00 455.00,318.00              455.00,318.00 455.00,327.00 455.00,327.00              455.00,327.00 453.09,350.00 453.09,350.00              453.09,350.00 449.91,406.00 449.91,406.00              449.91,406.00 448.00,442.00 448.00,442.00 Z            M 449.00,176.00            C 449.00,176.00 398.00,180.83 398.00,180.83              398.00,180.83 278.00,191.83 278.00,191.83              278.00,191.83 151.00,203.17 151.00,203.17              151.00,203.17 79.00,210.00 79.00,210.00              81.10,216.34 87.51,223.51 91.63,229.00              91.63,229.00 116.58,262.00 116.58,262.00              116.58,262.00 154.79,312.00 154.79,312.00              160.46,319.23 169.24,332.54 177.00,336.60              183.60,340.05 189.81,340.08 197.00,340.00              203.86,339.92 215.57,336.76 223.00,335.42              223.00,335.42 276.00,325.42 276.00,325.42              315.95,318.22 356.62,312.74 397.00,308.83              397.00,308.83 431.00,305.91 431.00,305.91              431.00,305.91 442.00,305.00 442.00,305.00              442.00,305.00 444.00,265.00 444.00,265.00              444.00,265.00 445.00,255.00 445.00,255.00              445.00,255.00 445.00,245.00 445.00,245.00              445.00,245.00 446.00,231.00 446.00,231.00              446.00,231.00 447.00,217.00 447.00,217.00              447.00,217.00 448.00,201.00 448.00,201.00              448.00,201.00 449.00,176.00 449.00,176.00 Z"
          />
        )}
        <path
          fill={isMounted ? 'url(#centerGradient)' : 'none'}
          id="circle"
          stroke="url(#centerGradient)"
          strokeWidth={isMounted ? '0' : "15"}
          strokeLinecap={isMounted ? 'round' : 'butt'}
          strokeDasharray={isMounted ? '0': "300 385"}
          strokeDashoffset="0"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        >
          {!isMounted && (
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          )}
        </path>

        {/* <path
          id="circle"
          fill="url(#centerGradient)"
          d="M490.1,280.649c0,44.459-36.041,80.5-80.5,80.5s-80.5-36.041-80.5-80.5s36.041-80.5,80.5-80.5
	S490.1,236.19,490.1,280.649z"
        /> */}
        <path
          id="path"
          fill="url(#centerGradient)"
          stroke="#fff"
          strokeWidth="1"
          d="M 441.00,311.00            C 441.00,311.00 392.00,317.43 392.00,317.43              392.00,317.43 280.00,337.40 280.00,337.40              280.00,337.40 223.00,349.21 223.00,349.21              213.60,351.24 201.41,354.89 192.00,355.00              182.63,355.11 173.34,354.20 165.00,349.48              154.35,343.44 142.15,325.94 134.20,316.00              134.20,316.00 70.80,237.00 70.80,237.00              70.80,237.00 53.25,215.00 53.25,215.00              46.28,206.55 39.21,199.88 41.22,188.00              42.27,181.85 50.59,173.78 54.72,169.00              54.72,169.00 88.57,130.00 88.57,130.00              88.57,130.00 150.58,59.00 150.58,59.00              150.58,59.00 164.58,43.00 164.58,43.00              167.43,39.71 171.82,34.34 175.91,32.80              178.20,31.94 185.32,32.00 188.00,32.00              188.00,32.00 233.00,30.00 233.00,30.00              233.00,30.00 249.00,29.00 249.00,29.00              249.00,29.00 275.00,28.00 275.00,28.00              275.00,28.00 294.00,27.00 294.00,27.00              294.00,27.00 310.00,26.00 310.00,26.00              310.00,26.00 326.00,25.00 326.00,25.00              326.00,25.00 352.00,24.00 352.00,24.00              352.00,24.00 380.00,22.00 380.00,22.00              380.00,22.00 405.00,21.00 405.00,21.00              405.00,21.00 419.00,20.00 419.00,20.00              419.00,20.00 457.00,18.00 457.00,18.00              457.00,18.00 467.00,17.04 467.00,17.04              467.00,17.04 476.00,17.04 476.00,17.04              476.00,17.04 493.00,16.00 493.00,16.00              493.00,16.00 510.00,15.00 510.00,15.00              510.00,15.00 525.00,14.00 525.00,14.00              525.00,14.00 541.00,13.00 541.00,13.00              541.00,13.00 565.00,12.00 565.00,12.00              565.00,12.00 575.00,11.09 575.00,11.09              575.00,11.09 598.00,10.00 598.00,10.00              598.00,10.00 611.00,9.00 611.00,9.00              618.26,8.92 634.15,6.68 640.00,9.00              640.00,9.00 620.00,13.93 620.00,13.93              620.00,13.93 612.00,13.93 612.00,13.93              612.00,13.93 590.00,16.09 590.00,16.09              590.00,16.09 562.00,18.83 562.00,18.83              562.00,18.83 532.00,21.17 532.00,21.17              532.00,21.17 311.00,40.83 311.00,40.83              311.00,40.83 220.00,48.83 220.00,48.83              220.00,48.83 196.00,50.91 196.00,50.91              196.00,50.91 181.00,53.16 181.00,53.16              181.00,53.16 168.00,67.00 168.00,67.00              168.00,67.00 146.58,93.00 146.58,93.00              146.58,93.00 98.59,151.00 98.59,151.00              98.59,151.00 71.00,185.00 71.00,185.00              71.00,185.00 83.00,184.09 83.00,184.09              83.00,184.09 119.00,181.17 119.00,181.17              119.00,181.17 139.00,179.83 139.00,179.83              139.00,179.83 205.00,174.17 205.00,174.17              205.00,174.17 225.00,172.83 225.00,172.83              225.00,172.83 273.00,168.91 273.00,168.91              273.00,168.91 316.00,165.09 316.00,165.09              316.00,165.09 425.00,156.17 425.00,156.17              425.00,156.17 482.00,151.83 482.00,151.83              482.00,151.83 572.00,144.17 572.00,144.17              572.00,144.17 592.00,142.83 592.00,142.83              592.00,142.83 640.00,138.91 640.00,138.91              640.00,138.91 662.00,137.20 662.00,137.20              664.51,136.97 669.75,136.87 672.00,137.20              690.00,141.53 676.44,161.54 671.19,170.00              671.19,170.00 615.31,256.00 615.31,256.00              615.31,256.00 528.69,389.00 528.69,389.00              528.69,389.00 503.34,428.00 503.34,428.00              500.21,432.80 495.68,441.74 490.91,444.59              483.35,449.09 462.52,450.15 453.00,451.16              453.00,451.16 377.00,459.28 377.00,459.28              377.00,459.28 341.00,463.17 341.00,463.17              341.00,463.17 315.00,466.02 315.00,466.02              309.12,466.42 298.02,468.99 293.00,467.00              293.00,467.00 335.00,460.41 335.00,460.41              335.00,460.41 394.00,450.92 394.00,450.92              394.00,450.92 434.00,445.00 434.00,445.00              434.00,445.00 435.00,419.00 435.00,419.00              435.00,419.00 436.00,402.00 436.00,402.00              436.00,402.00 437.00,388.00 437.00,388.00              437.00,388.00 438.00,367.00 438.00,367.00              438.00,367.00 439.00,354.00 439.00,354.00              439.00,354.00 440.00,336.00 440.00,336.00              440.00,336.00 441.00,311.00 441.00,311.00 Z            M 448.00,442.00            C 448.00,442.00 470.00,438.75 470.00,438.75              474.28,438.04 479.24,437.51 482.90,435.01              486.50,432.55 492.26,422.17 494.80,418.00              494.80,418.00 517.68,381.00 517.68,381.00              517.68,381.00 608.95,234.00 608.95,234.00              608.95,234.00 642.40,180.00 642.40,180.00              644.78,176.06 653.62,164.74 650.22,160.51              647.41,157.01 641.73,158.64 638.00,158.91              638.00,158.91 605.00,161.91 605.00,161.91              605.00,161.91 518.00,169.83 518.00,169.83              518.00,169.83 485.00,172.83 485.00,172.83              485.00,172.83 464.00,175.00 464.00,175.00              464.00,175.00 462.09,207.00 462.09,207.00              462.09,207.00 458.91,263.00 458.91,263.00              458.91,263.00 457.00,286.00 457.00,286.00              457.00,286.00 457.00,295.00 457.00,295.00              457.00,295.00 456.00,304.00 456.00,304.00              456.00,304.00 473.00,304.00 473.00,304.00              473.00,304.00 489.00,303.00 489.00,303.00              489.00,303.00 503.00,303.00 503.00,303.00              503.00,303.00 518.00,304.00 518.00,304.00              525.67,304.01 529.47,303.51 537.00,306.00              537.00,306.00 517.00,305.01 517.00,305.01              517.00,305.01 508.00,305.96 508.00,305.96              508.00,305.96 496.00,305.96 496.00,305.96              496.00,305.96 456.00,309.00 456.00,309.00              456.00,309.00 455.00,318.00 455.00,318.00              455.00,318.00 455.00,327.00 455.00,327.00              455.00,327.00 453.09,350.00 453.09,350.00              453.09,350.00 449.91,406.00 449.91,406.00              449.91,406.00 448.00,442.00 448.00,442.00 Z            M 449.00,176.00            C 449.00,176.00 398.00,180.83 398.00,180.83              398.00,180.83 278.00,191.83 278.00,191.83              278.00,191.83 151.00,203.17 151.00,203.17              151.00,203.17 79.00,210.00 79.00,210.00              81.10,216.34 87.51,223.51 91.63,229.00              91.63,229.00 116.58,262.00 116.58,262.00              116.58,262.00 154.79,312.00 154.79,312.00              160.46,319.23 169.24,332.54 177.00,336.60              183.60,340.05 189.81,340.08 197.00,340.00              203.86,339.92 215.57,336.76 223.00,335.42              223.00,335.42 276.00,325.42 276.00,325.42              315.95,318.22 356.62,312.74 397.00,308.83              397.00,308.83 431.00,305.91 431.00,305.91              431.00,305.91 442.00,305.00 442.00,305.00              442.00,305.00 444.00,265.00 444.00,265.00              444.00,265.00 445.00,255.00 445.00,255.00              445.00,255.00 445.00,245.00 445.00,245.00              445.00,245.00 446.00,231.00 446.00,231.00              446.00,231.00 447.00,217.00 447.00,217.00              447.00,217.00 448.00,201.00 448.00,201.00              448.00,201.00 449.00,176.00 449.00,176.00 Z"
        />
      </svg>
    </>
  );
};

export default Logo;
