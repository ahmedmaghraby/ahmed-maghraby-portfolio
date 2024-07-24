import React, { useEffect, useRef, useState ,useMemo} from "react";
import gsap from "gsap";
import TextPlugin from "gsap-trial/TextPlugin";

interface LogoProps {
  text?: string;
  finished?: Function;
}
gsap.registerPlugin(TextPlugin);

const MachineGun: React.FC<LogoProps> = ({
  text = "Machine Gun.",
  finished = () => console.log("finished"),
}) => {
  const container = useRef<any>(null);

  const _sentenceEndExp = /(\.|\?|!)$/g;
  useEffect(() => {
    setTimeout(() => {
      var words = text.split(" "),
        tl = gsap.timeline({ delay: 0.6, repeat: 2, repeatDelay: 4 }),
        wordCount = words.length,
        time = 0,
        word,
        element,
        duration,
        isSentenceEnd,
        i;

      for (i = 0; i < wordCount; i++) {
        word = words[i];
        isSentenceEnd = _sentenceEndExp.test(word);
        console.log(isSentenceEnd);

        element = document.createElement("h3");
        element.className = "absolute font-mono text-center -translate-x-1/2 -translate-y-1/2 text-main text-9xl top-1/2 left-1/2";
        element.innerHTML = word;
        if (container.current) {
          container.current.appendChild(element);
        }

        duration = Math.max(0.5, word.length * 0.1);
        if (isSentenceEnd) {
          duration += 0.5;
        }
        gsap.set(element, { autoAlpha: 0, scale: 0, z: 0.01 });
        tl.from(
          element,
          duration,
          { autoAlpha: 1, ease: "slow(0.25, 0.9, true)" },
          time
        ).to(
          element,
          duration+0.4,
          { scale: 1.2, ease: "slow(0.25, 0.9)" },
          time
        )
        time += duration - 0.05;
        if (isSentenceEnd) {
          time += 0.1;
        }
        if (i+1 === wordCount) {
          setTimeout(() => {
            if (container.current) {
              container.current.innerHTML = "";
            }
            finished();
          }, time * 1100);
        }
      }
    }, 7000);
  }, []);
  return (
    <>
      <div className="relative z-50 text-9xl text-main " ref={container}></div>
    </>
  );
};

export default MachineGun;
