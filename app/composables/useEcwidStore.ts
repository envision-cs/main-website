// composables/useEcwidStore.ts
interface EcwidWidget {
  widgetType: 'ProductBrowser';
  id: string;
  arg: string[];
}

declare global {
  interface Window {
    ecwid_script_defer?: boolean;
    ecwid_dynamic_widgets?: boolean;
    _xnext_initialization_scripts?: EcwidWidget[];
    ecwid_onBodyDone?: () => void;
    Ecwid?: { destroy?: () => void };
  }
}

const SCRIPT_ID = 'ecwid-script';

const DEFAULT_ARGS = [
  'categoriesPerRow=3',
  'views=grid(20,3) list(60) table(60)',
  'categoryView=grid',
  'searchView=list',
];

export function useEcwidStore(storeId: string, args: string[] = DEFAULT_ARGS) {
  const containerId = `my-store-${storeId}`;

  onMounted(() => {
    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;
    window.Ecwid?.destroy?.();

    window._xnext_initialization_scripts = [
      {
        widgetType: 'ProductBrowser',
        id: containerId,
        arg: [...args, `id=${containerId}`],
      },
    ];

    if (document.getElementById(SCRIPT_ID)) {
      window.ecwid_onBodyDone?.();
      return;
    }

    const el = document.createElement('script');
    el.id = SCRIPT_ID;
    el.type = 'text/javascript';
    el.charset = 'utf-8';
    el.setAttribute('data-cfasync', 'false');
    el.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2026-07-21`;
    document.body.appendChild(el);
  });

  onUnmounted(() => {
    window.Ecwid?.destroy?.();
  });

  return { containerId };
}
