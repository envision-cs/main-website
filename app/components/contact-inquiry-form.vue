<script setup lang="ts">
// Project Inquiry form for the Contact page ("Speak with our team" left column).
// Client-side validation + success state; posts to /api/inquiry which emails pursuits@.
const method = ref('');
const role = ref('');
const projectType = ref('');
const location = ref('');
const locationOther = ref('');
const timeline = ref('');
const source = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');
const company = ref('');
const message = ref('');
// honeypot (must stay empty; bots fill it)
const website = ref('');

const tried = ref(false);
const sending = ref(false);
const submitted = ref(false);
const sendError = ref('');

// Web3Forms access key is public by design and used client-side (their free tier
// only accepts browser submissions). It only permits emailing the address the key
// is registered to (pursuits@envision-cs.com).
const WEB3FORMS_ACCESS_KEY = 'c6b53eea-778b-4527-8990-bc6d9d7ac9ba';

const contactMethods = ['Email', 'Phone', 'Text', 'Either'];
const roles = ['Owner / Client', 'Architect / Designer', 'Public Agency', 'Trade Partner', 'Other'];
const projectTypes = ['Ground-up', 'Renovation', 'Design-build', 'Preconstruction', 'Early Concept', 'Not Sure Yet'];
const locations = ['Tampa', 'Pinellas', 'Sarasota / Manatee', 'Orlando', 'Pasco', 'Other'];
const timelines = ['Within 3 months', '3 to 6 months', '6 to 12 months', 'Still exploring'];
const sources = ['Referral', 'Worked with us before', 'Google search', 'Social media', 'Jobsite sign', 'Industry event or group', 'Other'];

const nameOk = computed(() => name.value.trim().length > 1);

const errorNote = computed(() => {
  if (sendError.value) return sendError.value;
  if (tried.value && !nameOk.value) return 'Add your name so we know who we are talking to.';
  return '';
});

async function onSubmit() {
  sendError.value = '';
  if (!nameOk.value) {
    tried.value = true;
    return;
  }
  sending.value = true;
  const dash = (v: string) => (v.trim() ? v.trim() : '—');
  try {
    const res = await $fetch<{ success?: boolean }>('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'accept': 'application/json' },
      body: {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Project Inquiry — ${name.value.trim()}`,
        from_name: 'Envision Website',
        replyto: email.value.trim() || undefined,
        botcheck: website.value || '', // honeypot: Web3Forms drops if filled
        'Preferred Contact Method': dash(method.value),
        'I Am': dash(role.value),
        'Project Type': dash(projectType.value),
        'Project Location': location.value === 'Other' ? `Other — ${locationOther.value}`.trim() : dash(location.value),
        'Timeline': dash(timeline.value),
        'How Did You Hear About Us?': dash(source.value),
        'Name': name.value.trim(),
        'Email': dash(email.value),
        'Phone': dash(phone.value),
        'Company': dash(company.value),
        'Describe the Project': dash(message.value),
      },
    });
    if (!res?.success) throw new Error('send failed');
    submitted.value = true;
    tried.value = false;
  }
  catch {
    sendError.value = 'Something went wrong. Please email pursuits@envision-cs.com or call 813-997-0330.';
  }
  finally {
    sending.value = false;
  }
}

function reset() {
  submitted.value = false;
  tried.value = false;
  sendError.value = '';
  method.value = role.value = projectType.value = location.value = locationOther.value = '';
  timeline.value = source.value = name.value = email.value = phone.value = company.value = message.value = '';
}
</script>

<template>
  <div class="inquiry">
    <!-- Header -->
    <div class="inquiry__head">
      <p class="inquiry__kicker">Project Inquiry</p>
      <p class="inquiry__title">Tell Us About Your Project</p>
      <p class="inquiry__sub">Takes about two minutes. Someone from our team will contact you within 24 business hours.</p>
    </div>

    <!-- Success -->
    <div v-if="submitted" class="inquiry__done">
      <p class="inquiry__title">Your Inquiry Was Sent.</p>
      <p class="inquiry__sub">Someone from our team will contact you within 24 business hours.</p>
      <button type="button" class="inquiry__sendanother" @click="reset">Send Another</button>
    </div>

    <!-- Form -->
    <form v-else class="inquiry__form" novalidate @submit.prevent="onSubmit">
      <!-- Preferred Contact Method (radios) -->
      <fieldset class="grp">
        <legend class="grp__label">Preferred Contact Method</legend>
        <div class="radios" role="radiogroup">
          <button
            v-for="m in contactMethods"
            :key="m"
            type="button"
            role="radio"
            :aria-checked="method === m"
            class="radio"
            :class="{ 'radio--on': method === m }"
            @click="method = m"
          >
            <span class="radio__ring"><span class="radio__dot" /></span>
            <span>{{ m }}</span>
          </button>
        </div>
      </fieldset>

      <!-- I Am (choice buttons) -->
      <fieldset class="grp">
        <legend class="grp__label">I Am</legend>
        <div class="chips">
          <button v-for="r in roles" :key="r" type="button" class="chip" :class="{ 'chip--on': role === r }" @click="role = role === r ? '' : r">{{ r }}</button>
        </div>
      </fieldset>

      <!-- Project Type -->
      <fieldset class="grp">
        <legend class="grp__label">Project Type</legend>
        <div class="chips">
          <button v-for="t in projectTypes" :key="t" type="button" class="chip" :class="{ 'chip--on': projectType === t }" @click="projectType = projectType === t ? '' : t">{{ t }}</button>
        </div>
      </fieldset>

      <!-- Project Location -->
      <fieldset class="grp">
        <legend class="grp__label">Project Location</legend>
        <div class="chips">
          <button v-for="l in locations" :key="l" type="button" class="chip" :class="{ 'chip--on': location === l }" @click="location = location === l ? '' : l">{{ l }}</button>
        </div>
      </fieldset>

      <label v-if="location === 'Other'" class="field field--full">
        <span class="field__label">Other Location</span>
        <input v-model="locationOther" type="text" class="field__input" placeholder="City or county">
      </label>

      <!-- Two-column grid: Timeline + Source, Name + Email, Phone + Company -->
      <div class="grid">
        <label class="field">
          <span class="field__label">Timeline</span>
          <select v-model="timeline" class="field__input field__select">
            <option value="">Select</option>
            <option v-for="t in timelines" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>

        <label class="field">
          <span class="field__label">How Did You Hear About Us? <span class="field__opt">(optional)</span></span>
          <select v-model="source" class="field__input field__select">
            <option value="">Select</option>
            <option v-for="s in sources" :key="s" :value="s">{{ s }}</option>
          </select>
        </label>

        <label class="field">
          <span class="field__label">Name</span>
          <input v-model="name" type="text" class="field__input" :class="{ 'field__input--err': tried && !nameOk }" placeholder="First and last">
        </label>

        <label class="field">
          <span class="field__label">Email <span class="field__opt">(optional)</span></span>
          <input v-model="email" type="email" class="field__input" placeholder="you@company.com">
        </label>

        <label class="field">
          <span class="field__label">Phone <span class="field__opt">(optional)</span></span>
          <input v-model="phone" type="tel" class="field__input" placeholder="(813) 000-0000">
        </label>

        <label class="field">
          <span class="field__label">Company <span class="field__opt">(optional)</span></span>
          <input v-model="company" type="text" class="field__input" placeholder="Organization">
        </label>
      </div>

      <label class="field field--full">
        <span class="field__label">Describe the Project <span class="field__opt">(optional)</span></span>
        <textarea v-model="message" rows="3" class="field__input field__textarea" placeholder="Size, delivery method, timing. Whatever you have so far." />
      </label>

      <!-- Honeypot: visually hidden, kept out of the tab order -->
      <div class="hp" aria-hidden="true">
        <label>Website<input v-model="website" type="text" tabindex="-1" autocomplete="off"></label>
      </div>

      <div class="inquiry__actions">
        <button type="submit" class="inquiry__submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send Inquiry' }}</button>
        <p v-if="errorNote" class="inquiry__err">{{ errorNote }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.inquiry {
  --f-text: #ffffff;
  --f-muted: #b4b4b8;
  --f-line: #3e3e43;
  --f-chip-line: #58585e;
  --f-accent: #59ba48;
  --f-err: #ff8a7a;

  margin-top: 20px;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid #ffffff;
  background: #1f1f22;
  color: var(--f-text);
  max-width: 100%;
}

.inquiry__head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--f-line);
}

.inquiry__kicker {
  margin: 0;
  color: var(--f-accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.inquiry__title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
}

.inquiry__sub {
  margin: 0;
  color: var(--f-muted);
  font-size: 14px;
  line-height: 1.6;
}

.inquiry__done {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.inquiry__sendanother {
  align-self: flex-start;
  padding: 0 0 3px;
  border: 0;
  border-bottom: 1px solid var(--f-accent);
  background: transparent;
  color: var(--f-text);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
}

.inquiry__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grp {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  border: 0;
}

.grp__label,
.field__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--f-text);
}

.field__opt {
  font-weight: 400;
  text-transform: none;
  color: var(--f-muted);
}

/* Radios */
.radios {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
}

.radio {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--f-text);
  font-size: 14px;
  cursor: pointer;
}

.radio__ring {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  border: 1px solid var(--f-chip-line);
  border-radius: 50%;
}

.radio--on .radio__ring {
  border-color: var(--f-accent);
}

.radio__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
}

.radio--on .radio__dot {
  background: var(--f-accent);
}

/* Choice buttons (chips) */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  min-height: 44px;
  padding: 8px 13px;
  border: 1px solid var(--f-chip-line);
  background: transparent;
  color: var(--f-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.chip:hover {
  border-color: var(--f-text);
}

.chip--on {
  border-color: var(--f-accent);
  background: var(--f-accent);
  color: #111111;
}

/* Text fields, selects, textarea (underline only) */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px 28px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.field--full {
  grid-column: 1 / -1;
}

.field__input {
  width: 100%;
  padding: 8px 0;
  border: 0;
  border-bottom: 1px solid var(--f-line);
  border-radius: 0;
  background: transparent;
  color: var(--f-text);
  font: inherit;
  font-size: 15px;
  -webkit-appearance: none;
  appearance: none;
}

.field__input::placeholder {
  color: #8a8a90;
}

.field__input--err {
  border-bottom-color: var(--f-err);
}

.field__select {
  padding-right: 24px;
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%238a8a90" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right 2px center;
}

.field__select option {
  color: #111111;
  background: #ffffff;
}

.field__textarea {
  line-height: 1.6;
  resize: vertical;
}

/* Honeypot */
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Actions */
.inquiry__actions {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: 4px;
}

.inquiry__submit {
  padding: 14px 26px;
  border: 1px solid #ffffff;
  background: transparent;
  color: var(--f-text);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.inquiry__submit:hover:not(:disabled) {
  border-color: var(--f-accent);
  background: var(--f-accent);
  color: #111111;
}

.inquiry__submit:disabled {
  opacity: 0.7;
  cursor: default;
}

.inquiry__err {
  margin: 0;
  color: var(--f-err);
  font-size: 13px;
}

/* Focus visibility */
.inquiry :where(button, input, select, textarea):focus-visible {
  outline: 2px solid var(--f-accent);
  outline-offset: 3px;
}
</style>
