<template>
  <div id="my-store-15518248" />
</template>

<script setup lang="ts">
declare global {
  interface Window {
    xProductBrowser?: (...options: string[]) => void;
  }
}

const storeId = '15518248';
// The Ecwid store is shared with Focus Flooring. Open on the Envision
// category instead of the brand chooser at the store root.
const envisionCategoryId = '156563002';
let scriptElement: HTMLScriptElement | null = null;

function initializeStore() {
  window.xProductBrowser?.(
    'categoriesPerRow=3',
    'views=grid(20,3) list(60) table(60)',
    'categoryView=grid',
    'searchView=list',
    `defaultCategoryId=${envisionCategoryId}`,
    `id=my-store-${storeId}`,
  );
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
</style>
