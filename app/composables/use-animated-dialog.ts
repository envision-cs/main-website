import { useBreakpoints, useMutationObserver } from '@vueuse/core';
import { animate, motionValue } from 'motion';

export function useAnimatedDialog(dialogRef: Ref<HTMLDialogElement | null>) {
  // --- State and Dependencies ---
  const { base } = useEasings();
  const route = useRoute();
  const isOpen = ref(false);
  const direction = ref<'top' | 'bottom'>('top');

  function handleOpen() {
    isOpen.value = true;
  };
  function handleClose() {
    isOpen.value = false;
  };

  // --- Breakpoints ---
  const breakpoints = useBreakpoints({
    laptop: 1024,
  });
  const isLaptop = breakpoints.greater('laptop');

  // --- Motion Values ---
  const y = motionValue(direction.value === 'top' ? '-100%' : '100%');
  const scale = motionValue(0);
  const opacity = motionValue(0);

  // --- Core Functions ---
  function openMenu() {
    const el = dialogRef.value;
    if (!el || el.open)
      return; // Don't re-open if already open

    handleOpen();

    // This triggers the 'open' event listener

    // Fade in backdrop
    opacity.set(0);
    animate(opacity, 1, {
      duration: 0.15,
      onUpdate: latest => (el.style.opacity = `${latest}`),
      ease: base,
    });

    // Run responsive animation
    if (isLaptop.value) {
      el.show();
      scale.set(0);
      animate(scale, 1, {
        duration: 0.4,
        onUpdate: latest => (el.style.transform = `scale(${latest})`),
        ease: base,
      });
    }
    else {
      el.showModal();
      y.set(direction.value === 'top' ? '-100%' : '100%');
      animate(y, '0%', {
        duration: 0.4,
        onUpdate: latest => (el.style.transform = `translateY(${latest})`),
        ease: base,
      });
    }
  }

  function closeMenu() {
    const el = dialogRef.value;
    if (!el)
      return;

    handleClose();
    // Run responsive animation
    if (isLaptop.value) {
      animate(scale, 0, {
        duration: 0.4,
        onUpdate: latest => (el.style.transform = `scale(${latest})`),
        ease: base,
      }).finished.then(() => {
        el.close(); // This triggers the 'close' event listener
      });
    }
    else {
      animate(y, direction.value === 'top' ? '-100%' : '100%', {
        duration: 0.4,
        onUpdate: latest => (el.style.transform = `translateY(${latest})`),
        ease: base,
      }).finished.then(() => {
        el.close(); // This triggers the 'close' event listener
      });
    }
  }

  // --- Watchers and Listeners ---
  useMutationObserver(dialogRef, () => {
    isOpen.value = !!dialogRef.value?.open;
  }, { attributes: true, attributeFilter: ['open'] });

  // Close menu on route change
  watch(() => route.path, closeMenu, { immediate: true });

  // Track the dialog's open/close state, even if closed via 'Escape' key
  watch(
    () => dialogRef.value,
    (newEl, oldEl) => {
      if (oldEl) {
        oldEl.removeEventListener('open', handleOpen);
        oldEl.removeEventListener('close', handleClose);
      }
      if (newEl) {
        newEl.addEventListener('open', handleOpen);
        newEl.addEventListener('close', handleClose);
        // Sync initial state
        isOpen.value = newEl.open;
      }
    },
    { immediate: true },
  );

  return {
    isOpen,
    direction,
    openMenu,
    closeMenu,
  };
}
