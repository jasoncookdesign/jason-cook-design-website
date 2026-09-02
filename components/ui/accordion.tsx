import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col border-t border-border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

// Single-open FAQ rows (DESIGN.md § 4): no card, 1px rule between rows, a
// 14px accent plus-mark that rotates 45° to a × on open — never a chevron.
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-8 py-6 text-left font-sans text-lg leading-snug tracking-[-0.01em] text-ink outline-none transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
        <span className="relative h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:rotate-45">
          <span className="absolute left-0 top-1/2 h-px w-3.5 -translate-y-1/2 bg-accent" />
          <span className="absolute left-1/2 top-0 h-3.5 w-px -translate-x-1/2 bg-accent" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "flex h-(--accordion-panel-height) max-w-[680px] flex-col gap-3.5 pb-7 pt-0 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-ink [&_p:not(:last-child)]:mb-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
