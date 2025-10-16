<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    active?: boolean;
    text?: string;
    children?: Snippet;
    onclick?: () => void;
    href?: string;
  };

  let { active, text, children, onclick, href }: Props = $props();
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  role={href ? 'link' : 'button'}
  class="font-inherit bg-(--bg-primary) hover:bg-(--bg-primary-hover) text-(--text-light) inline-flex cursor-pointer items-center gap-2 rounded border-0 px-4 py-2 align-middle font-bold uppercase"
  class:bg-(--bg-primary-active)!={active}
  {onclick}
  {href}
>
  {#if text}
    {text}
  {/if}

  {#if children}
    {@render children()}
  {/if}
</svelte:element>
