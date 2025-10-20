<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  type Props = {
    active?: boolean;
    text?: string;
    children?: Snippet;
    onclick?: () => void;
    href?: string;
    class?: string;
  };

  let { active, text, children, onclick, href, class: className }: Props = $props();
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  role={href ? 'link' : 'button'}
  class={twMerge(
    'font-inherit bg-(--bg-primary) hover:bg-(--bg-primary-hover) text-(--text-light) inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded border-0 px-1 py-2 align-middle text-xs font-bold uppercase leading-4 sm:px-4 sm:text-sm sm:leading-6 lg:text-base',
    className
  )}
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
