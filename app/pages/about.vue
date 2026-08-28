<script setup lang="ts">
useSeoMeta({
  title: 'About Envision | Building Legacy & Serving Others Through Construction',
  description:
    "Learn about Envision's mission, core values, and proven process. A faith-informed, people-first construction partner building legacy across Tampa Bay and Central Florida.",
  ogTitle: 'About Envision | Building Legacy & Serving Others Through Construction',
  ogDescription:
    'Our mission, core values, and proven process. A people-first construction partner serving Greater Tampa Bay and Central Florida.',
  ogImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Envision | Building Legacy & Serving Others Through Construction',
  twitterDescription:
    'Our mission, core values, and proven process. A people-first construction partner serving Greater Tampa Bay and Central Florida.',
  twitterImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
});

usePageView({
  eventName: 'about_page_viewed',
  funnelEvent: {
    funnel_stage: 'top',
    conversion_role: 'secondary_action',
    intent: 'low-medium',
    funnel_movement: 'down',
  },
});

// The Curator.io feed's published bundle looks for its container the moment it
// runs, so the loader must execute AFTER the feed div is in the DOM (client-side
// on mount) — never in <head>. Feed styling/layout lives in the Curator dashboard.
const CURATOR_FEED_ID = 'f54d9123-05f7-48b3-b0b2-3bbf1eb817bf';
let curatorTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  const load = () => {
    if (!document.getElementById('curator-feed-default-feed-layout')) {
      curatorTimer = setTimeout(load, 120);
      return;
    }
    if (document.querySelector('script[src*="cdn.curator.io/published"]')) return;
    const i = document.createElement('script');
    i.async = true;
    i.setAttribute('charset', 'UTF-8');
    i.src = `https://cdn.curator.io/published/${CURATOR_FEED_ID}.js`;
    const first = document.getElementsByTagName('script')[0];
    first?.parentNode?.insertBefore(i, first);
  };
  load();
});

onBeforeUnmount(() => {
  if (curatorTimer) clearTimeout(curatorTimer);
});
</script>

<template>
  <main class="about">
    <!-- 1 · Hero -->
    <section id="top" class="hero">
      <div class="heroSlot">
        <img
          src="/about/photo-hero.webp"
          alt="Envision team member on an active jobsite"
          style="object-position: 50% 31%"
        />
      </div>
      <div class="heroShade" aria-hidden="true" />
      <p class="heroTag" aria-hidden="true">Going Beyond<br>the Build</p>
      <div class="heroCopy">
        <p class="eyebrow eyebrow--onDark">About Envision</p>
        <h1>Buildings are only as good<br>as <em>the people who build them.</em></h1>
        <a class="scrollLink" href="#purpose">Discover the Envision way <span aria-hidden="true">↓</span></a>
      </div>
    </section>

    <!-- 2 · Our mission -->
    <section id="purpose" class="sec sec--tint purpose">
      <div class="purposeMain">
        <p class="eyebrow">Our mission</p>
        <h2 class="purposeTitle">Building legacy &amp; serving others<br>through construction.</h2>
      </div>
      <div class="purposeSub">
        <p class="eyebrow">Our promise</p>
        <h3 class="subHead">Going Beyond the Build</h3>
        <p class="lede">
          The build is only part of the story. We take ownership beyond the contract, protect
          what matters beyond the building, and create opportunity that lasts beyond today.
        </p>
      </div>
    </section>

    <!-- 3 · Our Three Uniques -->
    <section id="uniques" class="sec">
      <p class="eyebrow">Built differently, on purpose</p>
      <h2 class="h2">Our Three Uniques</h2>
      <div class="uGrid">
        <div class="uCol">
          <span class="uNum">01</span>
          <h3>Built on Faith, Driven by Purpose</h3>
          <p>Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.</p>
        </div>
        <div class="uCol">
          <span class="uNum">02</span>
          <h3>Impact Beyond Construction</h3>
          <p>We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge.</p>
        </div>
        <div class="uCol">
          <span class="uNum">03</span>
          <h3>Versatile. Adaptive. Enhanced Approach</h3>
          <p>No two projects are the same, and neither is our approach. We move with precision, flexibility, and care, delivering the personal attention of a local partner with the expertise of a national leader.</p>
        </div>
      </div>
    </section>

    <!-- 4 · Our Values -->
    <section id="values" class="values">
      <div class="valuesImg">
        <img
          src="/about/photo-values.webp"
          alt="A completed Envision project"
          style="object-position: 49% 50%"
        />
      </div>
      <div class="valuesBody">
        <p class="eyebrow">How we show up matters</p>
        <h2 class="h2">Our Values</h2>
        <div class="vList">
          <article>
            <span class="vNum">01</span>
            <div>
              <h3>Be Humbly Confident</h3>
              <p>Your gifts, talents, and resources are not only for you or about you. Lead with conviction, then back it with service.</p>
            </div>
          </article>
          <article>
            <span class="vNum">02</span>
            <div>
              <h3>It’s Bigger Than You</h3>
              <p>We build the company, the project, and the people around us with a bigger purpose in view. Purpose gets clearer when ego gets smaller.</p>
            </div>
          </article>
          <article>
            <span class="vNum">03</span>
            <div>
              <h3>Be the Light</h3>
              <p>Being positive should never be based on circumstances, but on an internal belief we choose to carry into every room. Optimism is a discipline, not a mood.</p>
            </div>
          </article>
          <article>
            <span class="vNum">04</span>
            <div>
              <h3>Be the Solution</h3>
              <p>Help first, be the easy button, and lead with the kind of clarity that breeds confidence.</p>
            </div>
          </article>
          <article>
            <span class="vNum">05</span>
            <div>
              <h3>Find a Better Way</h3>
              <p>We keep improving the way we work, communicate, and solve problems. Improvement is part of the job, not extra credit.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 5 · Candid strip -->
    <section class="candidWrap" aria-label="Envision, on any given week">
      <div class="candid">
        <figure><img src="/about/photo-candid-1.webp" alt="Two team members problem-solving on site"></figure>
        <figure><img src="/about/photo-candid-2.webp" alt="A team member mid-conversation"></figure>
        <figure><img src="/about/photo-candid-3.webp" alt="Hands on plans during a walkthrough"></figure>
        <figure><img src="/about/photo-candid-4.webp" alt="The Envision team off the clock"></figure>
      </div>
      <div class="candidNote">
        <p>Envision, on any given week</p>
        <p>Tampa Bay · Central Florida</p>
      </div>
    </section>

    <!-- 6 · The people behind the standard -->
    <section id="people" class="people">
      <div class="peopleCopy">
        <p class="eyebrow eyebrow--onDark">The people behind the standard</p>
        <h2 class="h2">Every person we hire<br><em>shapes who we are.</em></h2>
        <p class="lede peopleLede">Envision has grown since 2009 by hiring for character and developing people from there. Team members who joined early in their careers are running projects today.</p>
        <p class="peopleNote">The trade can be taught. Telling a client the hard truth, and leaving a site the way you would want it left for your own family, is what we hire for.</p>
        <NuxtLink class="btnOutline" to="/team">Meet the team <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <div class="peopleImg">
        <img
          src="/about/photo-people.webp"
          alt="Envision team collaborating"
          style="object-position: 47% 35%"
        />
      </div>
    </section>

    <!-- 7 · Our Proven Process -->
    <section id="process" class="sec sec--tint process">
      <div class="processGhost" aria-hidden="true"><img src="/about/proven-process-mark.png" alt=""></div>
      <div class="processHead">
        <p class="eyebrow">What working with Envision feels like</p>
        <h2 class="processTitle">
          <img src="/about/proven-process-lockup.png" alt="Our Proven Process: Listen. Plan. Execute. Cultivate.">
        </h2>
        <p class="lede processLede">Process is not bureaucracy. It is how certainty gets built before anything else does.</p>
      </div>
      <div class="steps">
        <article>
          <div class="stepLabel"><span class="stepNum">01</span><h3>Listen</h3></div>
          <p>Every project begins with thoughtful listening. Discovery meetings, site reviews, and clear communication lay the foundation for a partnership built on trust.</p>
        </article>
        <article>
          <div class="stepLabel"><span class="stepNum">02</span><h3>Plan</h3></div>
          <p>Budget-aligned design, permitting, early trade coordination, and risk mitigation—focused on eliminating surprises and protecting your timeline from day one.</p>
        </article>
        <article>
          <div class="stepLabel"><span class="stepNum">03</span><h3>Execute</h3></div>
          <p>Full visibility through Procore, weekly updates, and proactive oversight. Our team owns the outcome through to the final walkthrough.</p>
        </article>
        <article>
          <div class="stepLabel"><span class="stepNum">04</span><h3>Cultivate</h3></div>
          <p>System training, 30-60-90 day check-ins, and a one-year walkthrough. Our work does not end at closeout.</p>
        </article>
      </div>
    </section>

    <!-- 8 · Follow along (social feed) -->
    <section id="feed" class="sec sec--tint">
      <div class="feedHead">
        <div>
          <p class="eyebrow">Follow Envision</p>
          <h2 class="h2">Culture, as it happens.</h2>
        </div>
        <div class="feedLinks">
          <a href="https://www.instagram.com/envisioncs_/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/envisioncstampa" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/company/envision-cs/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div class="feedEmbed">
        <div id="curator-feed-default-feed-layout">
          <a href="https://curator.io" target="_blank" rel="noopener noreferrer" class="crt-logo crt-tag">Powered by Curator.io</a>
        </div>
      </div>
    </section>

    <!-- 9 · Our history -->
    <section class="sec story">
      <p class="eyebrow">Our history</p>
      <h2 class="storyTitle">Rooted in faith.<br>Built through relationships.</h2>
      <p class="storyCopy">A history of faith, purpose, mentorship, and opportunity, built one project and one relationship at a time.</p>
      <NuxtLink class="btnDark" to="/history">View the History Timeline <span aria-hidden="true">→</span></NuxtLink>
    </section>

    <!-- 10 · Start the conversation -->
    <section id="contact" class="sec sec--dark contact">
      <p class="eyebrow eyebrow--onDark">Start the conversation</p>
      <h2 class="contactTitle">Total transparency.<br><em>Or we make it right.</em></h2>
      <p class="lede contactLede">You deserve to know what is happening, what it means, and what comes next—from the first meeting to the final walkthrough.</p>
      <NuxtLink class="btnGreen" to="/contact">Talk with our team <span aria-hidden="true">→</span></NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.about {
  --navy: #0f2233;
  --green: #59ba48;
  --green-text: #2e7d32;
  --blue: #1b95d2;
  --gray65: #474a4c;
  --gray50: #717074;
  --gray10: #d6d5d6;
  --tint: #f6f7f7;
  --line: rgb(50 54 56 / 0.18);

  display: block;
  background: #fff;
  color: var(--navy);
  -webkit-font-smoothing: antialiased;
}

.about :where(h1, h2, h3) {
  margin: 0;
  font-weight: 500;
  line-height: 1.03;
  letter-spacing: -0.04em;
  text-wrap: pretty;
}

.about p {
  text-wrap: pretty;
}

.about img {
  display: block;
  max-width: 100%;
}

.eyebrow {
  margin: 0 0 20px;
  color: var(--green-text);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.eyebrow--onDark {
  color: var(--green);
}

.sec {
  padding: 76px 60px;
}

.sec--tint {
  background: var(--tint);
}

.sec--dark {
  background: var(--navy);
  color: #fff;
}

.h2 {
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
}

.lede {
  max-width: 62ch;
  color: var(--gray65);
  font-size: clamp(0.94rem, 1vw, 1.02rem);
  line-height: 1.7;
}

/* 1 · Hero */
.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 480px;
  overflow: hidden;
  background: var(--navy);
  color: #fff;
}

.heroSlot {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.heroSlot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroShade {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgb(15 34 51 / 0.55) 0%,
    rgb(15 34 51 / 0.5) 40%,
    rgb(15 34 51 / 0.93) 100%
  );
}

.heroCopy {
  position: relative;
  z-index: 3;
  max-width: 860px;
  padding: 72px 60px 58px;
}

.heroCopy h1 {
  font-size: clamp(2.3rem, 3.8vw, 3.4rem);
}

.heroCopy h1 em {
  font-style: normal;
  color: var(--green);
}

.scrollLink {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-top: 40px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgb(255 255 255 / 0.4);
  color: #fff;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

.scrollLink:hover {
  color: var(--green);
  border-color: var(--green);
}

/* Positioned to clear the site's overlaid header; hidden below the desktop nav breakpoint */
.heroTag {
  position: absolute;
  z-index: 3;
  top: 104px;
  right: 60px;
  margin: 0;
  padding-right: 18px;
  border-right: 2px solid var(--green);
  color: rgb(255 255 255 / 0.85);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 2;
  letter-spacing: 0.2em;
  text-align: right;
}

/* 2 · Our mission */
.purpose {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 56px;
  align-items: end;
}

.purposeMain {
  min-width: 0;
}

.purposeTitle {
  font-size: clamp(1.9rem, 2.9vw, 2.9rem);
}

.purposeSub {
  padding-left: 32px;
  border-left: 2px solid var(--green);
}

.subHead {
  margin-bottom: 22px;
  font-size: clamp(1.5rem, 2.1vw, 2.1rem);
  line-height: 1.05;
}

/* 3 · Three Uniques */
.uGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 44px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.uCol {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 44px 40px 48px 0;
  border-right: 1px solid var(--line);
}

.uCol:not(:first-child) {
  padding-left: 40px;
}

.uCol:last-child {
  padding-right: 0;
  border-right: 0;
}

.uNum {
  margin-bottom: 0;
  color: var(--green-text);
  font-weight: 600;
  font-size: clamp(1.6rem, 2.1vw, 2rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

.uCol h3 {
  max-width: 22ch;
  font-size: clamp(1.22rem, 1.6vw, 1.55rem);
  line-height: 1.12;
}

.uCol p {
  margin: 6px 0 0;
  color: var(--gray65);
  font-size: 0.89rem;
  line-height: 1.78;
}

/* 4 · Values */
.values {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  align-items: start;
}

.valuesImg {
  position: sticky;
  top: 0;
  min-width: 0;
  height: 76vh;
  min-height: 420px;
  overflow: hidden;
}

.valuesImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.valuesBody {
  padding: 76px 60px;
}

.vList {
  margin-top: 38px;
}

.vList article {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 22px;
  padding: 22px 0;
  border-top: 1px solid var(--line);
}

.vList article:last-child {
  border-bottom: 1px solid var(--line);
}

.vNum {
  padding-top: 5px;
  color: var(--green-text);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.vList h3 {
  margin-bottom: 12px;
  font-size: clamp(1.02rem, 1.2vw, 1.2rem);
  letter-spacing: -0.03em;
}

.vList p {
  margin: 0;
  color: var(--gray65);
  font-size: 0.875rem;
  line-height: 1.75;
}

/* 5 · Candid strip */
.candid {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr 1fr 0.9fr;
}

.candid figure {
  position: relative;
  height: 300px;
  margin: 0;
  overflow: hidden;
  border-right: 1px solid #fff;
}

.candid figure:last-child {
  border-right: 0;
}

.candid figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidNote {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  padding: 26px 60px 40px;
}

.candidNote p {
  margin: 0;
  color: var(--gray50);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* 6 · People */
.people {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  background: var(--navy);
  color: #fff;
}

.peopleCopy {
  align-self: center;
  padding: 76px 60px;
}

.peopleCopy h2 em {
  font-style: normal;
  color: var(--green);
}

.peopleLede {
  margin-top: 30px;
  color: rgb(255 255 255 / 0.88);
}

.peopleNote {
  max-width: 62ch;
  margin-top: 22px;
  color: rgb(255 255 255 / 0.72);
  font-size: clamp(0.94rem, 1vw, 1.02rem);
  line-height: 1.7;
}

.btnOutline {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 44px;
  padding: 17px 28px;
  border: 1px solid rgb(255 255 255 / 0.5);
  color: #fff;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.btnOutline:hover {
  border-color: var(--green);
  background: var(--green);
  color: var(--navy);
}

.peopleImg {
  position: relative;
  min-width: 0;
  min-height: 360px;
  overflow: hidden;
}

.peopleImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 7 · Proven Process */
.process {
  position: relative;
  overflow: hidden;
}

.processGhost {
  position: absolute;
  z-index: 1;
  top: -90px;
  right: -170px;
  width: 620px;
  opacity: 0.06;
  pointer-events: none;
}

.processHead {
  position: relative;
  z-index: 2;
  max-width: 900px;
}

.processTitle {
  margin: 0;
}

/* the lockup PNG carries transparent padding top and bottom — trimmed optically */
.processTitle img {
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: -30px 0 -38px -20px;
}

.processLede {
  margin-top: 8px;
}

.steps {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 44px;
  border-top: 1px solid var(--line);
}

.steps article {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px 24px 6px;
  border-right: 1px solid var(--line);
}

.steps article:last-child {
  border-right: 0;
}

.stepLabel {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.stepNum {
  color: var(--green-text);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.steps h3 {
  font-size: clamp(1.22rem, 1.55vw, 1.48rem);
}

.steps p {
  margin: 0;
  color: var(--gray65);
  font-size: 0.875rem;
  line-height: 1.75;
}

/* 8 · Feed */
.feedHead {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 48px;
}

.feedLinks {
  display: flex;
  gap: 12px;
}

.feedLinks a {
  padding: 13px 20px;
  border: 1px solid var(--line);
  color: inherit;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-decoration: none;
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

.feedLinks a:hover {
  color: var(--green-text);
  border-color: var(--green-text);
}

.feedEmbed {
  min-width: 0;
  padding: 28px;
  border: 1px solid var(--line);
  background: var(--tint);
}

.feedEmbed :deep(#curator-feed-default-feed-layout) {
  min-width: 0;
}

/* 9 · History */
.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  text-align: center;
}

.storyTitle {
  font-size: clamp(1.9rem, 2.9vw, 2.8rem);
}

.storyCopy {
  max-width: 60ch;
  margin: 0;
  color: var(--gray65);
  line-height: 1.8;
}

.btnDark {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding: 19px 32px;
  background: var(--navy);
  color: #fff;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 160ms ease;
}

.btnDark:hover {
  background: var(--green-text);
  color: #fff;
}

/* 10 · Contact */
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}

.contactTitle {
  font-size: clamp(2.4rem, 4.3vw, 4rem);
}

.contactTitle em {
  font-style: normal;
  color: var(--green);
}

.contactLede {
  text-align: center;
}

.btnGreen {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding: 19px 32px;
  background: var(--green);
  color: var(--navy);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 160ms ease;
}

.btnGreen:hover {
  background: #fff;
}

/* Responsive */
@media (max-width: 1100px) {
  .sec,
  .valuesBody,
  .peopleCopy {
    padding: 76px 40px;
  }

  .heroCopy {
    padding: 76px 40px 60px;
  }

  .heroTag {
    display: none;
  }

  .purpose {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }

  .steps {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .steps article:nth-child(2) {
    border-right: 0;
  }
}

@media (max-width: 900px) {
  .values,
  .people {
    grid-template-columns: minmax(0, 1fr);
  }

  .valuesImg {
    position: relative;
    top: auto;
    height: 340px;
    min-height: 0;
  }

  .peopleImg {
    min-height: 340px;
  }

  .candid {
    grid-template-columns: 1fr 1fr;
  }

  .candid figure {
    height: 220px;
    border-bottom: 1px solid #fff;
  }

  .candidNote {
    padding: 22px 40px 34px;
  }

  .uGrid {
    grid-template-columns: minmax(0, 1fr);
  }

  .uCol {
    padding: 30px 0 34px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .uCol:not(:first-child) {
    padding-left: 0;
  }

  .uCol:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 620px) {
  .sec,
  .valuesBody,
  .peopleCopy {
    padding-left: 24px;
    padding-right: 24px;
  }

  .heroCopy {
    padding: 60px 24px 48px;
  }

  .steps {
    grid-template-columns: minmax(0, 1fr);
  }

  .steps article {
    border-right: 0;
  }

  .valuesImg {
    height: 300px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scrollLink,
  .btnOutline,
  .btnDark,
  .btnGreen,
  .feedLinks a {
    transition: none;
  }
}
</style>
