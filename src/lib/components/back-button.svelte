<script lang="ts">
  import IconBackButton from '$lib/components/icons/arrow-back.svelte';
  import Button from './button.svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    href: string;
  };

  let { children, href }: Props = $props();
</script>

<Button {href}>
  <IconBackButton class="-my-3 size-8 shrink-0" />
  <div>{@render children()}</div>
</Button>
