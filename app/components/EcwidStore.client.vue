<template>
  <div id="my-store-15518248" />
</template>

<script setup lang="ts">
declare global {
  interface Window {
    xProductBrowser?: (...options: string[]) => void;
    Ecwid?: {
      OnPageLoaded?: { add: (callback: (page: { type: string }) => void) => void };
    };
  }
}

const storeId = '15518248';
// The Ecwid store is shared with Focus Flooring. Open on the Envision
// category instead of the brand chooser at the store root.
const envisionCategoryId = '156563002';
let scriptElement: HTMLScriptElement | null = null;
let productTrailListenerAdded = false;

// Ecwid hides the full breadcrumb trail on product pages, leaving no clear
// way back to browsing. Copy it to the top of the product, above the photo.
function addProductTrail(page: { type: string }) {
  const container = document.getElementById(`my-store-${storeId}`);
  container?.querySelectorAll('.envision-product-trail').forEach((trail) => trail.remove());

  if (page.type !== 'PRODUCT') return;

  const details = container?.querySelector('.product-details');
  const source =
    details?.querySelector('.product-details__description .ec-breadcrumbs') ??
    details?.querySelector('.ec-breadcrumbs');
  // Envision products only; pages outside Envision keep Ecwid's defaults.
  if (!details || !source?.querySelector(`a[data-category-id='${envisionCategoryId}']`)) return;

  const trail = source.cloneNode(true) as HTMLElement;
  trail.classList.add('envision-product-trail');
  trail.removeAttribute('itemprop');
  details.before(trail);
}

function initializeStore() {
  window.xProductBrowser?.(
    'categoriesPerRow=3',
    'views=grid(20,3) list(60) table(60)',
    'categoryView=grid',
    'searchView=list',
    `defaultCategoryId=${envisionCategoryId}`,
    `id=my-store-${storeId}`,
  );

  if (!productTrailListenerAdded && window.Ecwid?.OnPageLoaded) {
    window.Ecwid.OnPageLoaded.add(addProductTrail);
    productTrailListenerAdded = true;
  }
}

onMounted(() => {
  if (window.xProductBrowser) {
    initializeStore();
    return;
  }

  scriptElement = document.querySelector(`script[data-ecwid-store="${storeId}"]`);

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.src =
      `https://app.ecwid.com/script.js?${storeId}` + '&data_platform=code&data_date=2026-07-21';
    scriptElement.charset = 'utf-8';
    scriptElement.dataset.ecwidStore = storeId;
    scriptElement.setAttribute('data-cfasync', 'false');
    document.body.appendChild(scriptElement);
  }

  scriptElement.addEventListener('load', initializeStore, { once: true });
});

onUnmounted(() => {
  scriptElement?.removeEventListener('load', initializeStore);
});
</script>

<style>
/* Ecwid renders this markup, so these rules are unscoped and limited to this
   store's container. Inside the Envision category, hide the breadcrumb link to
   the shared store root (the brand chooser) so breadcrumbs start at Envision.
   Pages outside Envision keep Ecwid's default breadcrumbs. */
#my-store-15518248
  .ec-breadcrumbs:has(a[data-category-id='156563002'])
  a[data-category-id='0'],
#my-store-15518248
  .ec-breadcrumbs:has(a[data-category-id='156563002'])
  a[data-category-id='0']
  + .breadcrumbs__delimiter {
  display: none;
}

/* The product sidebar shows only the first breadcrumb link, which was the
   store root. Show the Envision link in its place. */
#my-store-15518248 .product-details__sidebar .ec-breadcrumbs a[data-category-id='156563002'] {
  display: inline !important;
}

/* Full trail copied to the top of product pages (see addProductTrail). The
   sidebar link above is the fallback, so hide it when the trail is present. */
#my-store-15518248 .envision-product-trail {
  display: block !important;
  margin-bottom: 24px;
}

#my-store-15518248 .envision-product-trail a,
#my-store-15518248 .envision-product-trail .breadcrumbs__delimiter {
  display: inline !important;
}

#my-store-15518248
  .envision-product-trail:has(a[data-category-id='156563002'])
  a[data-category-id='0'],
#my-store-15518248
  .envision-product-trail:has(a[data-category-id='156563002'])
  a[data-category-id='0']
  + .breadcrumbs__delimiter {
  display: none !important;
}

#my-store-15518248 .envision-product-trail + .product-details .product-details__sidebar .ec-breadcrumbs {
  display: none !important;
}
</style>
