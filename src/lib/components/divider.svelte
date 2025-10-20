<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  type Props = {
    class?: string;
  };

  let { class: className }: Props = $props();
</script>

<div class={twMerge('h-0.5 w-full bg-white/10 lg:hidden', className)}></div>
