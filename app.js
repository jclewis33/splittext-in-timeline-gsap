"use strict";

gsap.registerPlugin(SplitText);

document.fonts.ready.then(() => {
  let split;

  const heroTl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  // 2. Pre-split animations
  heroTl
    .to(".home-hero_image", {
      clipPath: "inset(0 0 0 0%)",
      opacity: 1,
      duration: 1.2,
    })
    .set(".home-hero_heading", { opacity: 1 }, "-=0.2") //Make sure to include a .set to reset the opacity if you hide it with CSS
    .to(".heading-style-eyebrow", { opacity: 1, duration: 0.6 });

  // 3. Split + post-split in one callback
  SplitText.create(".home-hero_heading", {
    type: "words, lines",
    lineClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      // 3a. Build your split-text tween
      split = gsap.from(self.lines, {
        duration: 1.5,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });

      // 3b. Insert it into heroTl, then chain the next tween
      heroTl
        .add(split, "-=0.3") // play split a bit before the previous tween ends
        .to(
          ".home-hero_content-wrapper",
          {
            duration: 0.8,
            opacity: 1,
            y: 0,
          },
          "-=1"
        ); // overlap content reveal with tail of split

      return split; // allows SplitText to manage/resplit if needed
    },
  });
});

/*code to add into webflow project
<script src="http://localhost:1234/app.js"></script>
*/
