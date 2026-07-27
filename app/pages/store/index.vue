<script setup lang="ts">
//definePageMeta({
//  middleware: 'page-access',
//});

const closingScriptTag = "</scr" + "ipt>";

const storeDocument = `
    <div id="my-store-15518248"></div>
    <script
      data-cfasync="false"
      src="https://app.ecwid.com/script.js?15518248&data_platform=code&data_date=2026-07-21"
      charset="utf-8"
          >${closingScriptTag}

    <script>
      xProductBrowser(
        'categoriesPerRow=3',
        'views=grid(20,3) list(60) table(60)',
        'categoryView=grid',
        'searchView=list',
        'id=my-store-15518248'
      );
      ${closingScriptTag}
`;
</script>

<template>
  <iframe :srcdoc="storeDocument" title="Online store" class="store-frame" allow="payment" />
</template>

<style scoped>
.store-frame {
  display: block;
  width: 100%;
  min-height: 1000px;
  border: 0;
}
</style>
