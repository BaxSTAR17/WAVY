export default defineAppConfig({
   ui: {
    accordion: {
      slots: {
         trailingIcon: 'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
      }
     },
     skeleton: {
      base: 'animate-pulse rounded-[calc(var(--ui-radius)*1.5)] bg-(--ui-bg-elevated)'
    },
     commandPalette: {
      slots: {
        root: 'flex flex-col min-h-0 min-w-0 divide-y divide-(--ui-border)',
        input: '[&>input]:h-12 rounded-2xl pl-1 box-border',
        close: '',
        content: 'relative overflow-hidden flex flex-col',
        viewport: 'relative divide-y divide-(--ui-border) scroll-py-1 overflow-y-auto flex-1 focus:outline-none',
        group: 'p-1 isolate',
        empty: 'py-6 text-center text-sm text-(--ui-text-muted)',
        label: 'px-2 py-1.5 text-xs font-semibold text-(--ui-text-highlighted)',
        item: 'group relative w-full flex items-center gap-2 px-2 py-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-[calc(var(--ui-radius)*1.5)] data-disabled:cursor-not-allowed data-disabled:opacity-75',
        itemLeadingIcon: 'shrink-0 size-5',
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'shrink-0 size-5',
        itemLeadingChipSize: 'md',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0 size-5',
        itemTrailingHighlightedIcon: 'shrink-0 size-5 text-(--ui-text-dimmed) hidden group-data-highlighted:inline-flex',
        itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5',
        itemTrailingKbdsSize: 'md',
        itemLabel: 'truncate space-x-1 rtl:space-x-reverse text-(--ui-text-dimmed)',
        itemLabelBase: 'text-(--ui-text-highlighted) [&>mark]:text-(--ui-bg) [&>mark]:bg-(--ui-primary)',
        itemLabelPrefix: 'text-(--ui-text)',
        itemLabelSuffix: 'text-(--ui-text-dimmed) [&>mark]:text-(--ui-bg) [&>mark]:bg-(--ui-primary)'
      },
      variants: {
        focus: {
          true: {
            input: 'bg-neutral-700'
          }
        },
        loading: {
          true: {
            itemLeadingIcon: 'animate-spin'
          }
        }
      }
    }
  }
});