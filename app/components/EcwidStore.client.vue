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
let scriptElement: HTMLScriptElement | null = null;

function initializeStore() {
  window.xProductBrowser?.(
    'categoriesPerRow=3',
    'views=grid(20,3) list(60) table(60)',
    'categoryView=grid',
    'searchView=list',
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
    document.head.appendChild(scriptElement);
  }

  scriptElement.addEventListener('load', initializeStore, { once: true });
});

onUnmounted(() => {
  scriptElement?.removeEventListener('load', initializeStore);
});
</script>
