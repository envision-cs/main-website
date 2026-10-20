<script setup lang="ts">
const description =
  'Founded in 2009 with a wide vision and a deliberate starting point: the residential years, the pivot to commercial construction, the partnerships that raised the ceiling, and the discipline that turned one company into two.';

useHead({ titleTemplate: null });
useSeoMeta({
  title: 'Our History | Envision',
  description,
  ogTitle: 'Our History | Envision',
  ogDescription: description,
  ogImage: 'https://www.envision-cs.com/history/hero.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Our History | Envision',
  twitterDescription: description,
  twitterImage: 'https://www.envision-cs.com/history/hero.jpg',
});

// Year rail: one dot per section; clicking scrolls there and the dot for the
// section in view fills. Section ids match the reference design.
const railStops = [
  { id: 'y1', label: '2002 – 2008', aria: 'Jump to 2002 to 2008' },
  { id: 'y2', label: '2009', aria: 'Jump to 2009' },
  { id: 'y4', label: '2009 – 2013', aria: 'Jump to 2009 to 2013' },
  { id: 'y4b', label: '2009 – 2010', aria: 'Jump to 2009 to 2010, training and licensure' },
  { id: 'y3', label: '2010 – 2012', aria: 'Jump to 2010 to 2012, Revealing Truth Ministries' },
  { id: 'y6', label: '2013', aria: 'Jump to 2013' },
  { id: 'y7', label: '2015', aria: 'Jump to 2015' },
  { id: 'y8', label: '2016', aria: 'Jump to 2016, foundational hires' },
  { id: 'y8b', label: '2016 · BECK', aria: 'Jump to the Beck Group partnership' },
  { id: 'y9', label: '2019', aria: 'Jump to 2019' },
  { id: 'y9b', label: '2019 +', aria: 'Jump to 2019 and onward, proprietary tooling' },
  { id: 'y10', label: '2021 – 2022', aria: 'Jump to 2021 to 2022' },
  { id: 'y11', label: '2022 – 2023', aria: 'Jump to 2022 to 2023' },
  { id: 'y12', label: '2024 – 2026', aria: 'Jump to 2024 to 2026' },
  { id: 'future', label: '2026', aria: 'Jump to 2026' },
];

const activeStop = ref(-1);

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function scrollToSection(id: string, offset = 0) {
  const target = document.getElementById(id);
  if (!target) return;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - offset,
    behavior: scrollBehavior(),
  });
}

function updateActiveStop() {
  const line = window.scrollY + window.innerHeight * 0.4;
  let active = -1;
  railStops.forEach((stop, index) => {
    const target = document.getElementById(stop.id);
    if (target && target.getBoundingClientRect().top + window.scrollY <= line) active = index;
  });
  activeStop.value = active;
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveStop, { passive: true });
  window.addEventListener('resize', updateActiveStop);
  updateActiveStop();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveStop);
  window.removeEventListener('resize', updateActiveStop);
});
</script>

<template>
  <div class="history">
    <aside class="yearRail" aria-label="Timeline navigation">
      <div class="railLine" />
      <button
        v-for="(stop, index) in railStops"
        :key="stop.id"
        type="button"
        :class="{ on: index === activeStop }"
        :aria-label="stop.aria"
        @click="scrollToSection(stop.id, 40)"
      >
        <span>{{ stop.label }}</span><i />
      </button>
    </aside>

    <section class="opening">
      <div class="openImg">
        <img src="/history/hero.jpg" alt="" width="1800" height="1200" fetchpriority="high">
      </div>
      <div class="openBg" />
      <div class="film" />
      <div class="openingMeta">
        <span>ENVISION / A FIRM HISTORY</span>
        <span>TAMPA BAY, FL</span>
      </div>
      <div class="openingCopy">
        <p>BUILDING LEGACY &amp; SERVING OTHERS THROUGH CONSTRUCTION</p>
        <h1>A history of<br><em>building.</em></h1>
      </div>
      <div class="openingFoot">
        <p>Founded in 2009 with a wide vision and a deliberate starting point. What follows is how that patience compounded: the residential years, the pivot to commercial construction, the partnerships that raised the ceiling, and the discipline that turned one company into two.</p>
        <a href="#archive" @click.prevent="scrollToSection('archive')">Begin the history <b>&#8595;</b></a>
      </div>
      <div class="stamp">EST.<br><b>2009</b></div>
    </section>

    <section id="archive" class="manifesto">
      <span class="sideLabel">ABOUT THIS HISTORY</span>
      <p>Go slow to go fast. Grow carefully. Build what lasts.</p>
      <h2>Seventeen years of building deliberately, one project at a <em>time.</em></h2>
      <div class="manifestoGrid">
        <p>The residential years taught the firm its standards.</p>
        <p>The pivot to commercial construction raised the ceiling.</p>
        <p>The partnerships raised it again.</p>
        <p>Operational maturity produced two companies.</p>
      </div>
      <div class="manifestoFoot">
        <span>2002 &mdash; Today</span>
        <a class="skipToday" href="#future" @click.prevent="scrollToSection('future')">Skip to today <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" style="display:inline-block;vertical-align:-0.05em;transform:rotate(90deg)"><path d="M3 13 13 3M5.5 3H13v7.5" /></svg></a>
      </div>
    </section>

    <section>
      <article id="y1" class="era plate">
        <div class="eraIndex" />
        <figure class="plateImg y1Prints">
          <div class="y1Print a">
            <img src="/history/history-sec01-jobsite.webp" alt="" width="1800" height="1013" loading="lazy">
          </div>
          <div class="y1Print b">
            <img src="/history/history-sec01-father-son.webp" alt="" width="1800" height="1004" loading="lazy">
          </div>
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>01</span><b>2002&ndash;08</b><small>The trade</small></div>
          <div class="eraHeading">
            <p>BEFORE ENVISION</p>
            <h2>The work was in the family before the company had a name.</h2>
          </div>
          <div class="eraCopy two">
            <p>Allen Greene Sr. ran a residential flooring business in Tampa Bay, and Allen Greene II grew up inside it, working the trade full-time as a teenager. In time he ran his own crew, then his own small flooring company.</p>
            <p>Two Greenes, parallel businesses, the same trade, the same city. Then in 2008 the housing market collapsed and took both businesses with it, almost overnight.</p>
            <blockquote>Envision was not founded in spite of the collapse. It was founded out of it.</blockquote>
          </div>
        </div>
      </article>

      <article id="y2" class="era plate rev">
        <div class="eraIndex" />
        <figure class="plateImg">
          <img src="/history/history-sec02-founding-2009.webp" alt="" width="1200" height="900" loading="lazy" style="object-position: 50% 25%">
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>02</span><b>2009</b><small>The founding</small></div>
          <div class="eraHeading">
            <p>ESTABLISHED &middot; TAMPA BAY</p>
            <h2>Envision is founded.</h2>
          </div>
          <div class="eraCopy two">
            <p>In 2009, father and son Allen Greene Sr. and Allen Greene II founded Envision with a renewed mindset built on faith and a shared vision to build something bigger than themselves: a company rooted in integrity, driven by purpose, and built on people and relationships.</p>
            <p>Originally established as Envision Development Enterprises, their vision extended beyond residential contracting to building a general construction and development company.</p>
            <p>They chose to begin in residential construction, building on their experience in the trade while laying the foundation for something much greater.</p>
            <blockquote>Go slow to go fast.</blockquote>
            <strong>THE FIRST TAGLINE: WHERE YOUR VISIONS COME TO LIFE.</strong>
          </div>
        </div>
      </article>

      <article id="y4" class="era tight">
        <div class="eraIndex"><span>03</span><b>2009&ndash;13</b><small>Residential years</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2009 &ndash; 2013 / BUILDING THE FOUNDATION</p>
            <h2>Four years of residential and light commercial work.</h2>
          </div>
          <div class="eraCopy">
            <p>Through the early 2010s, Envision focuses on residential and light commercial scopes across Tampa Bay, building a reputation for craftsmanship, completing projects on time, and earning the kind of trust that produces referrals.</p>
            <p>Investment flips, kitchen and bath renovations, additions, high-end homes, light commercial buildouts. Work won one referral at a time.</p>
            <blockquote>This is where the firm's culture and standards were forged.</blockquote>
          </div>
          <figure class="tightFig">
            <img src="/history/history-sec01-family-flooring.webp" alt="" width="1200" height="900" loading="lazy">
          </figure>
        </div>
      </article>

      <article id="y4b" class="era textonly compact">
        <div class="eraIndex"><span>04</span><b>2009&ndash;10</b><small>Training and licensure</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2009 &ndash; 2010 / INVESTMENT IN FUTURE CAPABILITY</p>
            <h2>Formal training, and the license that made it official.</h2>
          </div>
          <div class="eraCopy">
            <p>Allen Greene II completes formal training in construction estimating and project management at trade school in Sarasota, while simultaneously gaining field experience under a local general contractor. In 2009, the same year the company is founded, he earns his Florida general contractor license.</p>
            <blockquote>Formal education, field experience, and licensure: the foundation that made the 2013 commercial pivot possible.</blockquote>
          </div>
        </div>
      </article>

      <article id="y3" class="era textonly dark">
        <div class="eraIndex"><span>05</span><b>2010&ndash;12</b><small>Revealing Truth Ministries</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2010 &ndash; 2012 / THE FIRM'S LONGEST-RUNNING CLIENT RELATIONSHIP</p>
            <h2>Revealing Truth Ministries: from the first project to the first full renovation.</h2>
          </div>
          <div class="eraCopy">
            <p>Beginning in 2010, Envision is entrusted with project after project at Revealing Truth Ministries, both at the church campus and at the senior pastor's residence, establishing what would become one of the firm's defining repeat-client relationships.</p>
            <p>In 2012, that trust produces the firm's first full interior renovation. The client who chose Envision when it was small chose it again when the work got bigger, and what started as a project became the signal that pointed the firm toward its next move.</p>
            <blockquote>The proof, early and unmistakable, that the residential foundation was turning into something more.</blockquote>
            <strong>THE WORK CONTINUES, IN DIFFERENT FORMS, TO THIS DAY</strong>
          </div>
          <div class="figSolo">
            <figure>
              <img src="/history/history-sec05-rtm-2012.webp" alt="" width="1200" height="800" loading="lazy">
            </figure>
          </div>
        </div>
      </article>

      <article id="y6" class="era turning textonly">
        <div class="eraIndex"><span>06</span><b>2013</b><small>The pivot</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2013 / RESIDENTIAL TO COMMERCIAL</p>
            <h2>Envision moves into commercial construction.</h2>
          </div>
          <div class="eraCopy">
            <p>By 2013, the residential market has reached its growth ceiling for the firm, and Envision's leadership has built the foundation, formal and field, to take the company past it. The 2012 renovation had already shown what was possible. Now the firm acts on it, pivoting into commercial tenant improvements and interior renovations.</p>
            <blockquote>The slow start was never the destination. It was the runway.</blockquote>
            <strong>THE PIVOT &middot; THE MOVE THAT OPENED THE PATH TO THE REGIONAL COMMERCIAL GC ENVISION IS TODAY</strong>
          </div>
        </div>
      </article>

      <article id="y7" class="era plate">
        <div class="eraIndex" />
        <figure class="plateImg">
          <img src="/history/history-sec07-flooring-division.webp" alt="" width="1200" height="800" loading="lazy">
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>07</span><b>2015</b><small>Flooring division</small></div>
          <div class="eraHeading">
            <p>STRATEGIC DIVERSIFICATION</p>
            <h2>Envision launches a commercial flooring division.</h2>
          </div>
          <div class="eraCopy">
            <p>Drawing on decades of family flooring expertise, Envision launches a commercial flooring division within the firm. The strategic intent is twofold: deepen Envision's commercial-construction knowledge and relationships, and generate steady work while the construction management practice scales.</p>
            <p>The flooring division would later become a separate company. In 2015, it is the firm's most disciplined growth investment.</p>
          </div>
        </div>
      </article>

      <article id="y8" class="era half">
        <div class="eraIndex"><span>08</span><b>2016</b><small>Foundational hires</small></div>
        <div class="eraBody">
          <div class="halfDuo">
            <figure>
              <img src="/history/history-sec08-ariana.webp" alt="" width="724" height="724" loading="lazy" style="object-position: 88% 50%">
            </figure>
            <figure>
              <img src="/history/history-sec08-jacques.webp" alt="" width="483" height="724" loading="lazy">
            </figure>
          </div>
          <div class="halfCopy">
            <div class="eraHeading">
              <p>2016 / THE TEAM TAKES SHAPE</p>
              <h2>The year Envision becomes more than its founders alone.</h2>
            </div>
            <div class="eraCopy">
              <p>2016 marks a turning point in how the company is staffed. Ariana Greene joins full-time to lead administration and finance. Jacques Duval joins full-time to build marketing, business development, and sales infrastructure.</p>
              <p>Roles the founders had been carrying themselves become owned seats, held by people accountable for them. It is the first year the company runs on more than two people's capacity.</p>
              <blockquote>Two founders built it. From here, a team runs it.</blockquote>
            </div>
          </div>
        </div>
      </article>

      <article id="y8b" class="era half rev">
        <div class="eraIndex"><span>09</span><b>2016</b><small>The Beck Group</small></div>
        <div class="eraBody">
          <figure class="halfFig">
            <img src="/history/history-sec09-beck-partners.webp" alt="" width="2400" height="1600" loading="lazy">
          </figure>
          <div class="halfCopy">
            <div class="eraHeading">
              <p>2016 AND ONGOING / MENTORSHIP BECOMES PARTNERSHIP</p>
              <h2>The Beck Group relationship begins.</h2>
            </div>
            <div class="eraCopy">
              <p>In the same year, Envision begins a formal mentorship relationship with The Beck Group, one of the most respected design-build firms in the country. Beck did not take on the engagement immediately. The firms got to know each other first.</p>
              <p>The mentorship became a partnership, and the partnership became one of the longest-standing professional relationships in the firm's history.</p>
              <strong>30+ TEAM MEMBERS TRAINED THROUGH BECK &middot; 200+ PROJECTS TOGETHER AS CM PARTNERS</strong>
            </div>
          </div>
        </div>
      </article>

      <article id="y9" class="era impact">
        <div class="eraIndex" />
        <div class="eraBody">
          <div class="eraHeading">
            <p>2019 / THE SYSTEMS PIVOT</p>
            <h2>The year Envision became built to last.</h2>
          </div>
          <div class="eraCopy two">
            <p>2019 marked the firm's most consequential operational shift. After absorbing a significant project loss caused by an unprecedented drawing error, and choosing to absorb it in full rather than pass cost back to the client, Envision turned inward.</p>
            <p>The firm rebuilt its operations from the ground up. Processes were written down. Procedures were built from scratch. Training was stood up. The operating philosophy, stated plainly: the Chick-fil-A approach and mindset. Systems so disciplined that excellence becomes reproducible across any project, any team, any season.</p>
            <blockquote>Order before increase. Willing to make it right.</blockquote>
            <strong>THE GUARANTEE, TO THIS DAY: TOTAL TRANSPARENCY, OR WE MAKE IT RIGHT.</strong>
          </div>
        </div>
      </article>

      <article id="y9b" class="era compact">
        <div class="eraIndex"><span>10</span><b>2019+</b><small>Proprietary tooling</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2019 AND ONWARD / INVESTMENT IN SOFTWARE AND PROCESS</p>
            <h2>Proprietary processes and software, built to scale.</h2>
          </div>
          <div class="eraCopy">
            <p>In the years following the systems pivot, Envision invests in proprietary processes and software for how commercial work, particularly flooring delivery at scale, is estimated, planned, executed, and quality-controlled.</p>
            <blockquote>Built inside Envision and refined across hundreds of projects, these tools would become the operational backbone of Envision Flooring.</blockquote>
          </div>
        </div>
      </article>

      <article id="y10" class="era plate">
        <div class="eraIndex" />
        <figure class="plateImg">
          <img src="/history/history-sec11-eos-whiteboard-v2.webp" alt="" width="2048" height="1536" loading="lazy">
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>11</span><b>2021&ndash;22</b><small>EOS onboarded</small></div>
          <div class="eraHeading">
            <p>2021 &ndash; 2022 / ORDER AND POSITION</p>
            <h2>What got us here won't get us there.</h2>
          </div>
          <div class="eraCopy two">
            <p>By 2021, the firm had outgrown the systems that built it. Leadership made a deliberate decision: gain order and position first, so the company could prepare to separate its divisions into two distinct businesses and keep growing without breaking.</p>
            <p>Envision adopted EOS, the Entrepreneurial Operating System: one clear vision every person can see and share, the right people in the right seats with real ownership, a weekly rhythm that surfaces problems while they are still small, and decisions made on data and priorities instead of urgency.</p>
          </div>
          <blockquote class="y10Quote">A company strong enough to stand on its own, not on any one person.</blockquote>
        </div>
      </article>

      <article id="y11" class="era plate rev">
        <div class="eraIndex" />
        <figure class="plateImg">
          <img src="/history/history-sec12-photo.webp" alt="" width="2624" height="1476" loading="lazy" style="object-position: 40% 50%">
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>12</span><b>2022&ndash;23</b><small>A division becomes a company</small></div>
          <div class="eraHeading">
            <p>THE FLOORING DIVISION BECOMES FOCUS FLOORING</p>
            <h2>A new chapter of growth.</h2>
          </div>
          <div class="eraCopy two">
            <p>As Envision&rsquo;s commercial flooring division continued to grow, it became clear that the business required its own leadership, systems, and processes to support its continued success.</p>
            <p>In 2022, Focus Flooring was established as an independent company, allowing each business to focus on its respective strengths while continuing to build on the foundation established.</p>
            <p>The following year, Jacques Duval, who had been instrumental in growing the flooring division for nearly a decade, was appointed President of Focus Flooring, creating an opportunity for an existing team member to step into a new level of leadership.</p>
            <blockquote>A team member became a leader. A division became a company.</blockquote>
          </div>
        </div>
      </article>

      <article id="y12" class="era plate">
        <div class="eraIndex" />
        <figure class="plateImg">
          <img src="/history/history-sec13-motor-enclave.webp" alt="" width="1911" height="1274" loading="lazy">
        </figure>
        <div class="plateShade" />
        <div class="eraBody">
          <div class="plateYear"><span>13</span><b>2024&ndash;26</b><small>Two companies, two homes</small></div>
          <div class="eraHeading">
            <p>A NEW CHAPTER OF INDEPENDENCE</p>
            <h2>Each company comes into its own.</h2>
          </div>
          <div class="eraCopy">
            <p>Envision and Focus Flooring chart their course out of shared offices and toward separate homes. Envision makes plans to move into its own headquarters at The Motor Enclave, one of Tampa Bay's premier developments, with the move set for winter 2026. Focus Flooring continues to grow in its own direction.</p>
          </div>
          <blockquote class="y10Quote">The separation is not a split. It is what healthy growth looks like when it is done with discipline.</blockquote>
        </div>
      </article>

      <article id="y14" class="era evo">
        <div class="eraIndex"><span>14</span><b>2026</b><small>A sharper signature</small></div>
        <div class="eraBody">
          <div class="eraHeading">
            <p>2026 / GOING BEYOND THE BUILD</p>
            <h2>Same vision, evolved over time.</h2>
            <p class="evoLead">Seventeen years of building, one vision sharpened at every step. The new mark launches this year: same mission, same values, a sharper signature for the standard we hold on every project.</p>
          </div>
          <div class="evoRow">
            <div class="evoCell">
              <div class="evoMark"><img src="/history/logo-evo-2009.png" alt="Envision Development Enterprises logo, 2009" loading="lazy"></div>
              <div class="evoMeta"><span>01</span><b>The Original</b><small>2009</small></div>
            </div>
            <div class="evoCell">
              <div class="evoMark"><img src="/history/logo-evo-2011.png" alt="Envision Development logo, 2011" loading="lazy"></div>
              <div class="evoMeta"><span>02</span><b>The Refresh</b><small>2011</small></div>
            </div>
            <div class="evoCell">
              <div class="evoMark pair"><img src="/history/logo-evo-2013-flooring.png" alt="Envision Flooring logo, 2013" loading="lazy"><img src="/history/logo-evo-2013-development.png" alt="Envision Development logo, 2013" loading="lazy"></div>
              <div class="evoMeta"><span>03</span><b>Flooring &middot; Development</b><small>2013</small></div>
            </div>
            <div class="evoCell">
              <div class="evoMark"><img src="/history/logo-evo-2016.png" alt="Envision logo, 2016" loading="lazy"></div>
              <div class="evoMeta"><span>04</span><b>Coming Into Focus</b><small>2016</small></div>
            </div>
            <div class="evoCell now">
              <div class="evoMark"><span class="evoNew">NEW</span><img src="/history/logo-evo-2026.png" alt="Envision logo, 2026" loading="lazy"></div>
              <div class="evoMeta"><span>05</span><b>Going Beyond</b><small>Today</small></div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="intermission">
      <div class="ticker">
        <span>BUILT ON FAITH</span>
        <span>DRIVEN BY PURPOSE</span>
        <span>IMPACT BEYOND CONSTRUCTION</span>
      </div>
    </section>

    <section class="peopleScene">
      <div class="peopleImg">
        <img src="/history/history-sec14-team.webp" alt="" width="2226" height="1484" loading="lazy" style="object-position: 50% 100%">
      </div>
      <div class="peopleShade" />
      <div class="peopleWords">
        <p>THE PEOPLE / ENVISION TODAY</p>
        <h2>The whole team<br><em>carries the standard.</em></h2>
        <p>The people of Envision today are estimators, project managers, superintendents, designers, and trade partners who treat every job like it has their own name on it. Many found their first real career here. Some now lead the very teams they came up through. They are the reason a client's first project becomes their tenth.</p>
      </div>
    </section>

    <section id="future" class="future">
      <div class="futureTop">
        <span>NOW ENTERING</span>
        <b>THE NEXT CHAPTER &middot; DESIGN &amp; CONSTRUCTION</b>
      </div>
      <div class="futureMain">
        <div class="futureHead">
          <p>2026 &middot; WHAT COMES NEXT</p>
          <h2>From building the vision <em>to shaping it.</em></h2>
        </div>
        <div class="futureBody">
          <p>Seventeen years ago the firm set out to be a general construction and development company. The first name even said so. It started in residential on purpose, to earn the experience first. That patience is the reason the original vision is now within reach.</p>
          <div class="futurePromise">
            <span>OUR PROMISE</span>
            <blockquote>Building legacy &amp; serving others through construction.</blockquote>
          </div>
        </div>
      </div>
      <ol class="futureRail">
        <li><b>2009</b><span>Founded</span></li>
        <li><b>2013</b><span>Commercial</span></li>
        <li><b>2016</b><span>The team</span></li>
        <li><b>2022</b><span>Focus Flooring</span></li>
        <li class="next"><b>2026</b><span>Design &amp; Construction</span></li>
      </ol>
    </section>

    <section class="finale">
      <p>WHERE THE WORK STANDS TODAY.</p>
      <h2>Total transparency.<br><em>Or we make it right.</em></h2>
      <NuxtLink to="/contact">Start the conversation <b><svg width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" style="display:inline-block;vertical-align:-0.05em;transform:rotate(0deg)"><path d="M3 13 13 3M5.5 3H13v7.5" /></svg></b></NuxtLink>
      <div class="finalMark">GOING BEYOND<br>THE BUILD</div>
    </section>
  </div>
</template>

<style scoped>
/* Rebuilt from the approved History reference (handoff v7). Values, breakpoints and
   rule order follow the reference so its overrides resolve the same way. Proxima
   Nova is inherited from the site; the reference's placeholder top bar and footer
   are replaced by the site's real header and footer. */
.history {
  --navy: #0f2233;
  --green: #59ba48;
  --green-text: #2e7d32;
  --blue: #1b95d2;
  --ink: #323638;
  --gray65: #474a4c;
  --gray50: #717074;
  --gray10: #d6d5d6;
  --ground: #fff;
  --line: rgb(50 54 56 / 0.18);
  /* Room for the site header, which overlays the top of the hero. Stands in for the
     reference's 72px placeholder bar so the hero content sits where the design has it. */
  --header-space: 72px;

  background: #fff;
  color: var(--ink);
  /* The reference leaves line-height at the browser default wherever it doesn't set
     one; the site's base is 1.5, which would make every label and eyebrow taller. */
  line-height: normal;
}

.history :where(h1, h2, h3) {
  font-weight: 500;
  letter-spacing: -0.045em;
  margin-top: 0;
}

.history a {
  color: inherit;
  text-decoration: none;
}

.history img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Photos fill the frame the layout defines (the reference's image slots have no
   size of their own), so a photo's natural shape never stretches its frame. */
.history figure > img {
  position: absolute;
  inset: 0;
}

/* Year rail */
.yearRail {
  position: fixed;
  z-index: 15;
  left: 19px;
  top: 50%;
  transform: translateY(-50%);
  height: 66vh;
  width: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.railLine {
  position: absolute;
  left: 5px;
  top: 3%;
  bottom: 3%;
  width: 1px;
  background: rgb(255 255 255 / 0.28);
  mix-blend-mode: difference;
}
.yearRail button {
  border: 0;
  background: none;
  padding: 0;
  color: #fff;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  position: relative;
}
.yearRail button span {
  position: absolute;
  left: 18px;
  opacity: 0;
  transform: translateX(-5px);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  white-space: nowrap;
  transition: 0.25s;
  font-weight: 600;
}
.yearRail button i {
  width: 11px;
  height: 11px;
  border: 1px solid currentColor;
  border-radius: 50%;
  transition: 0.25s;
  display: block;
}
.yearRail button:hover span,
.yearRail button.on span {
  opacity: 1;
  transform: none;
}
.yearRail button.on i {
  background: currentColor;
  transform: scale(1.35);
}
.yearRail button:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 4px;
}

/* Hero */
.opening {
  min-height: calc(540px + var(--header-space));
  height: calc(100vh - 160px + var(--header-space));
  max-height: calc(700px + var(--header-space));
  background: var(--navy);
  color: #fff;
  position: relative;
  overflow: hidden;
  padding: calc(56px + var(--header-space)) 7vw 56px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6vw;
}
.openBg {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(15 34 51 / 0.97) 0 40%, rgb(15 34 51 / 0.32));
  z-index: 1;
  pointer-events: none;
}
.openImg {
  position: absolute;
  inset: 0;
  filter: saturate(0.5);
}
.film {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    repeating-linear-gradient(90deg, transparent 0 79px, rgb(255 255 255 / 0.12) 80px),
    repeating-linear-gradient(0deg, transparent 0 79px, rgb(255 255 255 / 0.08) 80px);
}
.openingMeta,
.openingCopy,
.openingFoot,
.stamp {
  position: relative;
  z-index: 2;
  pointer-events: none;
}
.openingFoot a,
.openingMeta {
  pointer-events: auto;
}
.openingMeta {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  white-space: nowrap;
}
.openingCopy p {
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  color: var(--green);
  margin: 0 0 24px;
  font-weight: 600;
}
.openingCopy h1 {
  font-size: clamp(2.8rem, 5vw, 4.6rem);
  line-height: 0.98;
  max-width: 14ch;
  margin: 0;
}
.openingCopy em,
.peopleWords em,
.finale h2 em,
.manifesto h2 em {
  font-style: normal;
  font-weight: 500;
}
.openingCopy em,
.manifesto h2 em,
.finale h2 em {
  color: var(--green);
}
.peopleWords em {
  color: var(--blue);
}
.openingFoot {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  flex-wrap: wrap;
}
.openingFoot p {
  max-width: 600px;
  line-height: 1.7;
  color: rgb(255 255 255 / 0.72);
  margin: 0;
}
.openingFoot a {
  font-size: 0.75rem;
  border-bottom: 1px solid;
  padding-bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 40px;
  letter-spacing: 0.1em;
  white-space: nowrap;
  flex: 0 0 auto;
}
.openingFoot a:hover {
  color: var(--green);
}
.stamp {
  position: absolute;
  right: 7vw;
  /* 20% down the design's hero, which starts below the space kept for the header */
  top: calc(var(--header-space) + (100% - var(--header-space)) * 0.2);
  width: 112px;
  height: 112px;
  border: 1px solid var(--green);
  border-radius: 50%;
  display: grid;
  place-content: center;
  text-align: center;
  color: var(--green);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  transform: rotate(9deg);
}
.stamp b {
  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
}

/* About this history */
.manifesto {
  padding: 64px 72px 56px 100px;
  position: relative;
  background: var(--ground);
  color: var(--navy);
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.manifesto h2 {
  color: var(--navy);
}
.manifesto h2 em {
  color: var(--green-text);
}
.manifesto > p {
  color: var(--navy);
}
.manifesto .sideLabel {
  color: var(--gray65);
}
.manifesto .manifestoGrid p {
  color: var(--gray65);
}
.manifesto .manifestoFoot span {
  color: var(--gray65);
}
.manifesto .skipToday {
  border-color: rgb(50 54 56 / 0.25);
  color: var(--navy);
}
.manifesto .skipToday:hover {
  background: var(--green);
  border-color: var(--green);
  color: var(--navy);
}
.manifestoFoot {
  position: relative;
  margin-top: 38px;
  padding-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 44px;
  align-items: center;
  justify-content: space-between;
}
.manifestoFoot span {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  font-weight: 600;
  text-transform: uppercase;
}
.skipToday {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  border: 1px solid rgb(255 255 255 / 0.4);
  padding: 15px 26px;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  font-weight: 600;
  text-transform: uppercase;
}
.skipToday:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
}
.sideLabel {
  font-size: 0.64rem;
  letter-spacing: 0.2em;
  writing-mode: vertical-rl;
  position: absolute;
  left: 62px;
  top: 10vw;
}
.manifesto > p {
  margin: 1em 0;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  position: relative;
}
.manifesto h2 {
  font-size: clamp(2.4rem, 4.4vw, 4rem);
  line-height: 0.98;
  max-width: 24ch;
  margin: 56px 0;
  position: relative;
}
.manifestoGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 40px;
  position: relative;
}
.manifestoGrid p {
  padding: 0 0 12px;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  line-height: 1.55;
  margin: 0;
  text-wrap: pretty;
}

/* Eras: shared frame */
.era {
  --yearcol: 228px;

  display: grid;
  grid-template-columns: var(--yearcol) minmax(0, 1fr);
  border-bottom: 1px solid rgb(50 54 56 / 0.08);
  position: relative;
  background: #fff;
}
.eraIndex {
  padding: 60px 32px 60px 64px;
  position: sticky;
  top: 0;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.era::before {
  content: '';
  position: absolute;
  left: var(--yearcol);
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--line);
}
.era.impact::before {
  display: none;
}
.eraIndex span {
  font-size: 0.65rem;
  color: var(--green-text);
  letter-spacing: 0.14em;
  font-weight: 600;
}
.eraIndex b {
  font-size: clamp(1.45rem, 1.9vw, 1.95rem);
  font-weight: 500;
  line-height: normal;
  margin: 0;
  color: var(--navy);
  letter-spacing: -0.03em;
  white-space: nowrap;
}
.eraIndex small {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-top: 0;
  font-size: 0.62rem;
  color: var(--gray50);
}
.eraBody {
  padding: 60px 72px 64px 56px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-content: start;
}
.eraHeading {
  grid-column: 1/-1;
}
.eraHeading > p {
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  color: var(--green-text);
  margin: 0 0 18px;
  font-weight: 600;
  text-wrap: balance;
}
.eraHeading h2 {
  font-size: clamp(1.75rem, 2.6vw, 2.6rem);
  line-height: 1.08;
  max-width: 34ch;
  margin: 0;
  color: var(--navy);
  text-wrap: balance;
}
.era figure {
  margin: 0;
  aspect-ratio: 4/3;
  min-height: 240px;
  max-height: 400px;
  position: relative;
  overflow: hidden;
}
.eraCopy {
  align-self: start;
  padding: 22px 0 0;
}
.eraCopy > p {
  line-height: 1.8;
  color: #50616a;
  margin: 0 0 16px;
}
.eraCopy blockquote {
  margin: 30px 0 0;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: var(--green-text);
}
.eraCopy strong {
  display: block;
  margin-top: 35px;
  color: var(--green-text);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

/* Plates: navy, photo on one side */
.era.plate {
  grid-template-columns: 100%;
  background: var(--navy);
  color: #fff;
  min-height: 560px;
  overflow: hidden;
}
.era.plate::before,
.era.plate .eraIndex {
  display: none;
}
.era figure.plateImg {
  position: absolute;
  inset: 0 0 0 52%;
  z-index: 1;
  aspect-ratio: auto;
  width: auto;
  height: 100%;
  min-height: 0;
  max-height: none;
}
.era.plate .plateShade {
  position: absolute;
  inset: 0 0 0 38%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(90deg, var(--navy) 0%, rgb(15 34 51 / 0.9) 24%, rgb(15 34 51 / 0.2) 52%, rgb(15 34 51 / 0.08) 82%, rgb(15 34 51 / 0) 100%);
}
.era.plate .plateYear {
  position: relative;
  z-index: 3;
  margin-bottom: 28px;
  pointer-events: none;
}
.era.plate .plateYear span {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--green);
  margin-bottom: 10px;
}
.era.plate .plateYear b {
  display: block;
  font-size: clamp(2.6rem, 5.2vw, 4.6rem);
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
.era.plate .plateYear small {
  display: block;
  margin-top: 12px;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  font-weight: 600;
  color: var(--green);
  text-transform: uppercase;
}
.era.plate .eraBody {
  position: relative;
  z-index: 3;
  pointer-events: none;
  grid-template-columns: minmax(0, 1fr);
  align-content: center;
  padding: 92px 40px 92px 96px;
  max-width: 56%;
}
.era.plate .eraHeading > p {
  color: var(--green);
}
.era.plate .eraHeading h2 {
  color: #fff;
  font-size: clamp(2rem, 3.2vw, 3rem);
  max-width: 24ch;
}
.era.plate .eraCopy {
  padding: 26px 0 0;
  border-color: rgb(255 255 255 / 0.24);
}
.era.plate .eraCopy > p {
  color: rgb(255 255 255 / 0.74);
}
.era.plate .eraCopy blockquote {
  color: var(--green);
}
/* Mirrored plate: photo left, type right */
.era.plate.rev figure.plateImg {
  inset: 0 52% 0 0;
}
.era.plate.rev .plateShade {
  inset: 0 38% 0 0;
  background: linear-gradient(270deg, var(--navy) 0%, rgb(15 34 51 / 0.9) 24%, rgb(15 34 51 / 0.2) 52%, rgb(15 34 51 / 0.08) 82%, rgb(15 34 51 / 0) 100%);
}
.era.plate.rev .eraBody {
  margin-left: 48%;
  max-width: 52%;
  padding: 84px 60px 84px 44px;
}
.era.plate .eraCopy.two {
  columns: 1;
}
.era.plate .eraCopy strong {
  color: var(--green);
}
/* 12 (Focus Flooring) runs a touch smaller than the other plates */
.era.plate#y11 {
  min-height: 400px;
}
.era.plate.rev#y11 .eraBody {
  padding: 48px 48px 48px 40px;
}
/* 13: same recipe as 11, a 3:2 photo top-right on clean navy, quote under it */
.era.plate#y12 .plateShade {
  display: none;
}
.era.plate#y12 figure.plateImg {
  inset: 0 0 auto 52%;
  height: auto;
  aspect-ratio: 3/2;
}
.era.plate#y12 .eraBody {
  max-width: none;
  display: grid;
  grid-template-columns: minmax(0, 47%) minmax(0, 1fr);
  column-gap: 8%;
  padding-right: 72px;
}
.era.plate#y12 .eraBody > * {
  grid-column: 1;
}
.era.plate#y12 .y10Quote {
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: start;
  margin: calc(32vw - 56px) 0 6px;
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--green);
  padding-top: 22px;
  border-top: 2px solid var(--green);
}
@media (max-width: 760px) {
  .era.plate#y12 .eraBody {
    grid-template-columns: minmax(0, 1fr);
    padding-right: 34px;
  }
  .era.plate#y12 .y10Quote {
    grid-column: 1;
    grid-row: auto;
    margin-top: 28px;
  }
}
.era.plate#y11 .plateYear {
  margin-bottom: 16px;
}
.era.plate#y11 .plateYear b {
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
}
.era.plate#y11 .plateYear small {
  margin-top: 9px;
}
.era.plate#y11 .eraHeading h2 {
  font-size: clamp(1.5rem, 2.2vw, 2.05rem);
}
.era.plate#y11 .eraHeading > p {
  margin-bottom: 13px;
}
.era.plate#y11 .eraCopy {
  padding-top: 16px;
}
.era.plate#y11 .eraCopy > p {
  margin-bottom: 12px;
}
@media (max-width: 760px) {
  .era.plate.rev figure.plateImg {
    inset: auto;
  }
  .era.plate.rev .plateShade {
    display: none;
  }
  .era.plate.rev .eraBody {
    margin-left: 0;
    padding: 44px 34px 54px;
  }
}
@media (max-width: 760px) {
  .era.plate {
    min-height: 0;
  }
  .era figure.plateImg {
    position: relative;
    inset: auto;
    width: 100%;
    height: 260px;
  }
  .era.plate .plateShade {
    display: none;
  }
  .era.plate .eraBody {
    max-width: none;
    padding: 44px 34px 54px;
  }
  .era.plate .plateYear {
    margin-bottom: 20px;
  }
}

/* 10: heading left, copy right */
.era.compact .eraBody {
  padding-top: 48px;
  padding-bottom: 52px;
}
.era.compact .eraIndex {
  padding-top: 48px;
  padding-bottom: 52px;
}
.era.compact .eraCopy > p {
  max-width: 78ch;
}

/* 14: logo evolution */
.era.evo .eraBody {
  grid-template-columns: minmax(0, 1fr);
  row-gap: 0;
  padding-bottom: 72px;
}
.era.evo .eraHeading h2 {
  max-width: 22ch;
}
.era.evo .eraHeading > p.evoLead {
  margin: 18px 0 0;
  max-width: 58ch;
  line-height: 1.8;
  color: #50616a;
  font-size: 1rem;
  letter-spacing: 0;
  font-weight: 400;
}
.evoRow {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin-top: 44px;
  position: relative;
}
.evoCell {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.evoMark {
  position: relative;
  aspect-ratio: 4/3;
  background: #f6f7f7;
  overflow: hidden;
}
.history .evoMark img {
  position: absolute;
  inset: 20% 16%;
  width: calc(100% - 32%);
  height: calc(100% - 40%);
  object-fit: contain;
}
.history .evoMark.pair img:first-of-type {
  inset: 18% 12% 52% 12%;
  width: 76%;
  height: 30%;
}
.history .evoMark.pair img:last-of-type {
  inset: 56% 12% 18% 12%;
  width: 76%;
  height: 26%;
}
.evoCell.now .evoMark {
  background: #fff;
  outline: 2px solid var(--green);
  outline-offset: -2px;
}
.evoNew {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.56rem;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: var(--navy);
  background: var(--green);
  padding: 4px 7px;
  z-index: 1;
}
.evoMeta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.evoMeta span {
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: var(--green-text);
}
.evoMeta b {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--navy);
  letter-spacing: -0.01em;
}
.evoMeta small {
  font-size: 0.74rem;
  color: var(--gray65);
}
.evoCell.now .evoMeta {
  border-top: 2px solid var(--green);
  padding-top: 13px;
}
@media (max-width: 980px) {
  .evoRow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 28px;
  }
}
@media (max-width: 600px) {
  .evoRow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 10: heading left, copy right */
.era#y9b .eraBody {
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr);
  column-gap: 64px;
  row-gap: 0;
}
.era#y9b .eraHeading {
  grid-column: 1;
}
.era#y9b .eraCopy {
  grid-column: 2;
  padding-top: 30px;
}
.era#y9b .eraCopy > p {
  max-width: 60ch;
}
.era#y9b .eraCopy blockquote {
  margin-bottom: 0;
}
@media (max-width: 980px) {
  .era#y9b .eraBody {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 20px;
  }
  .era#y9b .eraCopy {
    grid-column: 1;
    padding-top: 0;
  }
}
@media (max-width: 620px) {
  .manifestoGrid {
    grid-template-columns: 1fr;
  }
}

/* 03: copy beside a photo that starts at the top of the section */
.era.tight .eraBody {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.18fr);
  column-gap: 40px;
  row-gap: 10px;
  align-content: start;
}
.era.tight .eraHeading,
.era.tight .eraCopy {
  grid-column: 1;
}
.era.tight .eraHeading h2 {
  max-width: 26ch;
}
.era.tight .eraCopy {
  padding-top: 6px;
}
.era.tight .tightFig {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: start;
  margin: 0;
  aspect-ratio: 5/4;
  min-height: 0;
  max-height: none;
}

/* 05: full-width photo under the copy */
.era .figSolo {
  grid-column: 1/-1;
  margin-top: 30px;
}
.era .figSolo figure {
  margin: 0;
  aspect-ratio: auto;
  height: clamp(280px, 32vw, 460px);
  min-height: 0;
  max-height: none;
}

/* 2019 statement */
.era.impact {
  grid-template-columns: 100%;
  color: #fff;
  background: var(--navy);
  overflow: hidden;
}
.era.impact .eraIndex {
  display: none;
}
.era.impact .eraBody {
  grid-template-columns: 1fr;
  padding: 66px 72px 68px 64px;
}
.era.impact .eraHeading h2 {
  font-size: clamp(2.1rem, 3.6vw, 3.4rem);
  line-height: 1.06;
  max-width: 26ch;
  color: #fff;
}
.era.impact .eraHeading > p {
  color: var(--green);
}
.era.impact .eraCopy strong {
  color: var(--green);
}
.era.impact .eraCopy {
  max-width: none;
  border-color: rgb(255 255 255 / 0.24);
}
.era.impact .eraCopy > p {
  color: rgb(255 255 255 / 0.72);
}
.era.impact .eraCopy blockquote {
  color: var(--green);
}

/* 06: text only, on the light ground, with the TURNING POINT watermark */
.era.turning {
  background: var(--ground);
}
.era.turning::after {
  content: 'TURNING POINT';
  position: absolute;
  right: 2vw;
  top: 20px;
  font-size: 4.4vw;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.05em;
  color: rgb(15 34 51 / 0.07);
  pointer-events: none;
  z-index: 0;
}
.era.turning .eraBody {
  position: relative;
  z-index: 1;
  max-width: 74%;
  padding-top: 104px;
}
.era.turning .eraIndex {
  padding-top: 104px;
}
.era.turning .eraHeading h2 {
  font-size: clamp(2rem, 3.1vw, 3rem);
}
.era.turning .eraIndex small {
  color: var(--gray65);
}
.era.turning .eraCopy > p {
  color: var(--gray65);
}
.era.turning .eraCopy blockquote {
  font-size: 1.05rem;
}

/* Ticker */
.intermission {
  background: #fff;
  color: var(--navy);
  overflow: hidden;
}
.ticker {
  white-space: nowrap;
  color: var(--gray65);
  font-size: 0.63rem;
  letter-spacing: 0.2em;
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  background: #fff;
  border-top: 1px solid var(--line);
  padding: 20px 0;
}

/* People scene */
.peopleScene {
  min-height: 560px;
  height: 82vh;
  max-height: 760px;
  position: relative;
  color: #fff;
  background: var(--navy);
  display: flex;
}
.peopleImg {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.peopleShade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(15 34 51 / 0.9), rgb(15 34 51 / 0.15));
  z-index: 2;
  pointer-events: none;
}
.peopleWords {
  position: relative;
  z-index: 3;
  margin: auto 0;
  padding: 64px 72px 64px 100px;
  max-width: 980px;
  pointer-events: none;
}
.peopleWords > p:first-child {
  margin: 1em 0;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--blue);
  font-weight: 600;
}
.peopleWords h2 {
  font-size: clamp(2.1rem, 3.6vw, 3.4rem);
  line-height: 1.04;
  margin: 20px 0;
}
.peopleWords > p:last-child {
  max-width: 650px;
  line-height: 1.8;
  color: rgb(255 255 255 / 0.78);
  margin: 0;
}

/* Now Entering */
.future {
  background: #fff;
  padding: 72px 72px 80px 100px;
  position: relative;
  overflow: hidden;
}
.future::after {
  content: 'NEXT CHAPTER';
  position: absolute;
  right: 2vw;
  top: 128px;
  font-size: 6vw;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.05em;
  color: rgb(15 34 51 / 0.05);
  pointer-events: none;
  white-space: nowrap;
}
.futureTop {
  border-bottom: 1px solid var(--line);
  color: var(--gray65);
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 14px;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  white-space: nowrap;
}
.futureTop span {
  color: var(--green-text);
  font-weight: 600;
}
.futureMain {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 72px;
  padding: 72px 0 80px;
  align-items: end;
}
.futureHead > p {
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  font-weight: 600;
  color: var(--green-text);
  margin: 0 0 22px;
}
.futureHead h2 {
  font-size: clamp(2.6rem, 4.6vw, 4.4rem);
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--navy);
  max-width: 13ch;
  text-wrap: balance;
}
.futureHead h2 em {
  font-style: normal;
  color: var(--green-text);
}
.futureBody > p {
  line-height: 1.8;
  color: #50616a;
  margin: 0;
  max-width: 52ch;
}
.futurePromise {
  margin-top: 32px;
  padding-top: 22px;
  border-top: 2px solid var(--green);
}
.futurePromise span {
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  font-weight: 600;
  color: var(--gray65);
}
.futurePromise blockquote {
  margin: 10px 0 0;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--navy);
}
.futureRail {
  position: relative;
  z-index: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.futureRail::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 5px;
  height: 1px;
  background: var(--gray10);
}
.futureRail li {
  position: relative;
  padding-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.futureRail li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--navy);
}
.futureRail li.next::before {
  background: #fff;
  box-shadow: inset 0 0 0 2px var(--green);
}
.futureRail b {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: normal;
  color: var(--navy);
  letter-spacing: -0.01em;
}
.futureRail span {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--gray65);
}
.futureRail li.next b,
.futureRail li.next span {
  color: var(--green-text);
}

/* Finale */
.finale {
  min-height: 520px;
  background: var(--navy);
  color: #fff;
  padding: 104px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
  position: relative;
}
.finale > p {
  font-size: 0.64rem;
  letter-spacing: 0.2em;
  margin: 0;
  color: rgb(255 255 255 / 0.6);
  font-weight: 600;
  white-space: nowrap;
}
.finale h2 {
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  line-height: 1.02;
  margin: 0;
}
.finale > a {
  background: var(--green);
  color: #0f2233;
  padding: 18px 28px;
  display: inline-flex;
  align-items: center;
  gap: 50px;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  font-weight: 600;
  white-space: nowrap;
  transition: background 160ms ease;
}
.finale > a:hover {
  background: #6ecb5b;
}
.finale > a:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 4px;
}
.finalMark {
  position: absolute;
  right: 4vw;
  bottom: 4vw;
  text-align: left;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  border-left: 1px solid;
  padding-left: 15px;
  color: rgb(255 255 255 / 0.6);
  line-height: 1.6;
}

/* Breakpoints, in the reference's order */
@media (max-width: 1100px) {
  .yearRail {
    display: none;
  }
  .opening {
    padding-left: 7vw;
  }
  .manifesto {
    padding-left: 64px;
  }
  .eraIndex {
    padding-left: 28px;
  }
  .era.impact .eraBody {
    padding-left: 64px;
  }
  .peopleWords {
    padding-left: 64px;
  }
  .future {
    padding-left: 64px;
  }
  .sideLabel {
    left: 24px;
  }
  .futureMain {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    padding: 56px 0 64px;
  }
}
@media (max-width: 980px) {
  .era {
    --yearcol: 210px;
  }
  .eraBody {
    padding: 56px 40px;
  }
  .era.impact .eraBody {
    padding: 72px 40px;
  }
  .eraBody {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 900px) {
  .opening {
    padding: calc(50px + var(--header-space)) 25px 50px;
  }
  .stamp {
    display: none;
  }
  .openingFoot {
    display: block;
  }
  .sideLabel {
    display: none;
  }
  .openingMeta,
  .futureTop,
  .finale > p {
    white-space: normal;
  }
  .manifesto {
    padding: 100px 30px;
  }
  .manifestoGrid {
    grid-template-columns: 1fr 1fr;
  }
  .era {
    grid-template-columns: 100%;
    min-height: auto;
    --yearcol: 0px;
  }
  .era::before {
    display: none;
  }
  .eraIndex {
    position: relative;
    height: auto;
    min-height: 0;
    padding: 32px 25px !important;
    border-right: 0;
    border-bottom: 1px solid var(--line);
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
  }
  .eraIndex b {
    margin: 0;
  }
  .eraBody {
    grid-template-columns: 1fr;
    padding: 70px 28px;
  }
  .era.impact .eraBody {
    padding: 90px 25px;
  }
  .futureMain {
    grid-template-columns: 1fr;
  }
  .peopleWords {
    padding: 90px 25px;
  }
  .eraCopy {
    padding-left: 0;
  }
}

/* Era layout variants */
.eraCopy.two {
  columns: 2;
  column-gap: 46px;
}
.eraCopy.two > p {
  margin: 0 0 16px;
  break-inside: avoid;
}
.eraCopy.two blockquote,
.eraCopy.two strong {
  column-span: all;
}
.era.textonly .eraBody {
  grid-template-columns: minmax(0, 1fr);
}
.era.textonly .eraCopy {
  padding-left: 0;
}
/* 05 runs navy */
.era.dark {
  background: var(--navy);
  color: #fff;
  border-bottom-color: rgb(255 255 255 / 0.1);
}
.era.dark::before {
  background: rgb(255 255 255 / 0.14);
}
.era.dark .eraIndex b {
  color: #fff;
}
.era.dark .eraIndex span {
  color: var(--green);
}
.era.dark .eraIndex small {
  color: rgb(255 255 255 / 0.55);
}
.era.dark .eraHeading > p {
  color: var(--green);
}
.era.dark .eraHeading h2 {
  color: #fff;
}
.era.dark .eraCopy {
  border-color: rgb(255 255 255 / 0.24);
}
.era.dark .eraCopy > p {
  color: rgb(255 255 255 / 0.74);
}
.era.dark .eraCopy blockquote {
  color: var(--green);
}
.era.dark .eraCopy strong {
  color: var(--green);
}
/* 08 and 09: half-and-half */
.era.half .eraBody {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  padding: 0;
  align-items: stretch;
  gap: 0;
}
.era.half .halfFig {
  margin: 0;
  height: 100%;
  min-height: 420px;
  max-height: none;
  aspect-ratio: auto;
}
.era.half .halfCopy {
  padding: 64px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.era.half.rev .eraBody {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.era.half.rev .halfFig {
  order: 2;
}
.era.half .eraHeading {
  margin-bottom: 26px;
}
.era.half .eraCopy {
  padding: 24px 0 0;
}
.era.half .halfDuo {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  align-self: center;
  height: auto;
  min-height: 0;
  padding: 0 28px;
}
.era.half .halfDuo figure {
  position: relative;
  margin: 0;
  aspect-ratio: 4/5;
  height: auto;
  min-height: 0;
  max-height: none;
  overflow: hidden;
}
@media (max-width: 980px) {
  .era.half .halfCopy {
    padding: 56px 40px;
  }
}
@media (max-width: 760px) {
  .eraCopy.two {
    columns: 1;
  }
  .era.turning .eraBody {
    max-width: none;
  }
  .era.turning::after {
    font-size: 8vw;
    top: 18px;
  }
  .era.tight .eraBody {
    grid-template-columns: minmax(0, 1fr);
  }
  .era.tight .tightFig {
    grid-column: 1;
    grid-row: auto;
    margin-top: 26px;
    aspect-ratio: 5/4;
    max-height: 380px;
  }
  .era.half .eraBody,
  .era.half.rev .eraBody {
    grid-template-columns: 1fr;
  }
  .era.half.rev .halfFig {
    order: 0;
  }
  .era.half .halfFig {
    min-height: 280px;
    height: 300px;
  }
  .era.half .halfDuo {
    min-height: 0;
    height: auto;
    padding: 40px 40px 0;
  }
}

/* v7 design pass */
.eraBody {
  row-gap: 26px;
}
.eraCopy {
  padding-top: 0;
}
.era.plate .eraCopy {
  padding-top: 4px;
}
.era.plate .plateYear {
  margin-bottom: 22px;
}
.era.turning .eraBody {
  row-gap: 26px;
}
/* 03: the photo runs the full height of its copy */
.era.tight#y4 .tightFig {
  align-self: stretch;
  aspect-ratio: auto;
  height: auto;
  min-height: 360px;
  max-height: none;
}
/* 08: portraits level with the headline */
.era.half#y8 .eraBody {
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
}
/* 09: Beck group photo holds 3:2 so all six people stay in frame */
.era.half.rev#y8b .eraBody {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  align-items: center;
}
.era.half#y8b .halfFig {
  height: auto;
  min-height: 0;
  aspect-ratio: 3/2;
  align-self: center;
  margin: 48px 48px 48px 0;
}
@media (max-width: 760px) {
  .era.half.rev#y8b .eraBody {
    grid-template-columns: minmax(0, 1fr);
  }
  .era.half#y8b .halfFig {
    height: auto;
    min-height: 0;
    aspect-ratio: 3/2;
    margin: 0;
  }
}
.era.half#y8 .halfDuo {
  align-self: center;
  padding: 56px 0 56px 40px;
  gap: 12px;
}
.era.half#y8 .halfDuo figure {
  aspect-ratio: 3/4;
}
@media (max-width: 980px) {
  .era.tight#y4 .tightFig {
    min-height: 0;
    aspect-ratio: 4/3;
    align-self: start;
    width: 100%;
    height: auto;
  }
  .era.half#y8 .halfDuo {
    padding: 40px 40px 0;
    align-self: start;
  }
}

/* 01: two family snapshots framed like loose prints on navy, no wash */
.era.plate#y1 {
  min-height: 560px;
}
.era.plate#y1 .eraBody {
  max-width: 48%;
}
.era.plate#y1 .plateShade {
  display: none;
}
.era.plate#y1 figure.plateImg {
  inset: 0 56px 0 53%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.y1Print {
  background: #f4f1ea;
  padding: 8px;
  box-shadow: 0 18px 40px rgb(0 0 0 / 0.35);
  position: relative;
}
.history .y1Print img {
  aspect-ratio: 16/9;
  height: auto;
}
.y1Print.a {
  width: 86%;
  z-index: 1;
}
.y1Print.b {
  width: 70%;
  margin-top: -12%;
  align-self: flex-end;
  z-index: 2;
}
@media (max-width: 760px) {
  .era.plate#y1 {
    min-height: 0;
  }
  .era.plate#y1 .eraBody {
    max-width: none;
    padding-top: 28px;
  }
  .era.plate#y1 figure.plateImg {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    padding: 32px 24px 8px;
    box-sizing: border-box;
  }
  .y1Print {
    padding: 6px;
  }
  .y1Print.a {
    width: 88%;
  }
  .y1Print.b {
    width: 72%;
    margin-top: -14%;
  }
}

/* 11: 3:2 photo top-right at 52%, no fade, quote under it */
.era.plate#y10 .plateShade {
  display: none;
}
.era.plate#y10 figure.plateImg {
  inset: 0 0 auto 52%;
  height: auto;
  aspect-ratio: 3/2;
}
@media (max-width: 760px) {
  .era.plate#y10 figure.plateImg {
    inset: auto;
    height: auto;
  }
}
.era.plate#y10 .eraBody {
  max-width: none;
  grid-template-columns: minmax(0, 47%) minmax(0, 1fr);
  column-gap: 8%;
  padding-right: 72px;
}
.era.plate#y10 .eraBody > * {
  grid-column: 1;
}
/* From the reference's earlier 11 layout; still in effect under the plate recipe */
.era#y10 .eraBody {
  row-gap: 8px;
}
.era#y10 .eraCopy > p {
  max-width: 62ch;
}
.era.plate#y10 .y10Quote {
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: start;
  margin: calc(32vw - 56px) 0 6px;
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--green);
  padding-top: 22px;
  border-top: 2px solid var(--green);
}
@media (max-width: 760px) {
  .era.plate#y10 .eraBody {
    grid-template-columns: minmax(0, 1fr);
    padding-right: 34px;
  }
  .era.plate#y10 .y10Quote {
    grid-column: 1;
    grid-row: auto;
    margin-top: 28px;
  }
}
@media (max-width: 760px) {
  .futureRail {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 22px;
    padding-left: 28px;
  }
  .futureRail::before {
    left: 5px;
    right: auto;
    top: 6px;
    bottom: 6px;
    width: 1px;
    height: auto;
  }
  .futureRail li {
    padding-top: 0;
    flex-direction: row;
    align-items: baseline;
    gap: 14px;
  }
  .futureRail li::before {
    left: -28px;
    top: 5px;
  }
  .future::after {
    display: none;
  }
}

/* Phone pass: desktop untouched */
@media (max-width: 760px) {
  .era.plate .eraBody,
  .era.plate.rev .eraBody,
  .era.plate#y12 .eraBody {
    max-width: none;
  }
  .era.plate.rev#y11 .eraBody {
    padding: 44px 34px 54px;
  }
  .era.plate figure.plateImg,
  .era.plate#y12 figure.plateImg {
    inset: auto;
    width: 100%;
  }
  .era.half#y8 .eraBody {
    grid-template-columns: minmax(0, 1fr);
  }
  .era.half#y8 .halfDuo {
    padding: 32px 28px 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .era.half#y8 .halfDuo figure {
    width: 100%;
  }
  .era.half#y8 .eraCopy {
    padding: 32px 28px 56px;
  }
  .era.turning::after {
    top: 104px;
    font-size: 64px;
  }
  .future {
    padding: 56px 25px 64px;
  }
  .futureTop {
    flex-direction: column;
    gap: 6px;
    white-space: normal;
  }
  .intermission {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 6px;
    column-gap: 12px;
    height: auto;
    padding: 14px 20px;
    white-space: normal;
    text-align: center;
  }
  .intermission * {
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .yearRail button span,
  .yearRail button i {
    transition: none;
  }
}
</style>
