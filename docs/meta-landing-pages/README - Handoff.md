# Envision Landing Pages: Handoff

Four new pages for the Meta ad campaigns. They're finished and approved, and everything needed is in this folder. Upload them, check them, and send a preview link back for a final look.

## Instructions for Claude Code (read first)

- **Everything you need is in this folder.** Do not ask Natalie for keys, IDs, emails, photos or copy. They're all already in the files.
- **Do not redesign, rewrite or restyle the pages.** Publish them exactly as they are. If the site's framework needs it, put this whole folder in the static or public directory so the files are served untouched.
- Do steps 1–3 below, run the checks in step 5 yourself, then deploy to a **preview link** (not live).
- **Then reply to Natalie using the "Report back" format at the bottom of this file**, word for word, with the links filled in. That tells her exactly what to test and what to click.

## 1. Add these 4 pages

| File in this folder | Publish at |
| --- | --- |
| `office-renovation.html` | envision-cs.com/office-renovation |
| `athletic-facilities.html` | envision-cs.com/athletic-facilities |
| `thank-you-office.html` | envision-cs.com/thank-you-office |
| `thank-you-athletic.html` | envision-cs.com/thank-you-athletic |

- Upload the whole folder as-is, keeping the folder structure. The pages need `support.js`, `image-slot.js`, `_ds/` and `assets/` next to them.
- Serve each page at its clean URL above, without ".html".
- The pages already include the site's Proxima Nova font (loaded from envision-cs.com/fonts/) and web-sized photos. No restyling is needed.

## 2. Keep them hidden

- Do **not** add them to the menu, footer or sitemap. Only the ads link to them.
- Each page already includes `<meta name="robots" content="noindex, nofollow">`, so leave it in.

## 3. Meta domain verification (home page only)

Add this exact line inside `<head>` of the **home page** (envision-cs.com/), not the landing pages. It must be in the HTML source, not added by JavaScript:

```html
<meta name="facebook-domain-verification" content="kd24i309ugjexc19fdy1m020wv3pbr" />
```

## 4. Already built in, so leave as-is

**Meta Pixel (ID 29227754990247374)** is already in all 4 pages:
- **PageView** fires on every page.
- **Lead** fires on both Thank You pages.
- **Contact** fires when someone taps the text link.

**Forms (Web3Forms)** are already connected:
- Leads go to **pursuit@envision-cs.com** through the existing website contact form's account.
- Subject lines: "New Lead: Office Renovation Landing Page" / "New Lead: Athletic Facility Landing Page".
- Each email includes the source and the page URL.
- After submitting, the form sends the visitor to `/thank-you-office` or `/thank-you-athletic`.

**Videos** are Vimeo embeds, with no autoplay or loop, captions off by default, and pausing when scrolled away:
- Office (Kacee Howes): 1238473486
- Athletic (Jason, UT): 1238412389

**Text link:** (833) 405-1332 through https://slk1.io/51b0

## 5. After it's live, check these

1. Open all 4 URLs on a phone and a computer. Photos, tabs and videos should all work.
2. Submit the form on each landing page. It should go to the matching Thank You page, and an email should arrive at pursuit@envision-cs.com.
3. Confirm the pages don't appear in the site menu.
4. **Send the 4 live links back for a final "looks good."**

## 6. Last step (Natalie)

Once the home page tag is live, go to Meta Business Settings → Brand Safety → Domains → envision-cs.com and click **Verify Domain**.

## Report back (Claude Code: send this to Natalie)

> **Landing pages are on a preview link. Here's what I did and what you need to do.**
>
> **Done and checked:**
> - ✅ 4 pages added: [office link] · [athletic link] · [thank-you-office link] · [thank-you-athletic link]
> - ✅ Hidden from the menu and sitemap; noindex confirmed
> - ✅ Meta Pixel 29227754990247374 is present on all 4 pages
> - ✅ Meta domain verification tag added to the home page `<head>`
> - ✅ Form connected to Web3Forms and redirects to the matching Thank You page
> - ✅ Photos, tabs and videos load on desktop and mobile
>
> **Your turn (5 minutes):**
> 1. Open the office link on your phone and submit the form with your own info. You should land on the Thank You page, and an email titled "New Lead: Office Renovation Landing Page" should arrive at pursuit@envision-cs.com.
> 2. Do the same on the athletic link.
> 3. If both look good, reply **"looks good, push live."**
>
> **After it's live:**
> 4. Meta Business Settings → Brand Safety → Domains → envision-cs.com → click **Verify Domain**.
> 5. Optional: in Meta Events Manager, open the pixel and confirm PageView and Lead show up after a test.

## Optional, later

The videos load faster if they're hosted on the site instead of Vimeo:
1. Export as MP4, 720p, under 15 MB each.
2. Add them to `/videos/` in the repo.
3. Replace the Vimeo iframes with `<video controls playsinline preload="metadata">`.
