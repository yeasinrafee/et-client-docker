"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  label,
}: MultiSelectProps) {
  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((s) => s !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      {/*
        ROOT CAUSE OF THE "MODAL CLOSES ITSELF AFTER PICKING A CATEGORY" BUG:

        Radix's DropdownMenu defaults to `modal={true}`. That makes the
        dropdown register its OWN independent modal dismissable-layer
        (focus trap + pointer-event lock), completely separate from the
        parent Dialog's modal layer. The dropdown's portaled content is
        never registered as a "branch" of the Dialog's layer, so the
        Dialog's own outside-pointerdown detector doesn't know the
        dropdown belongs to it.

        Radix's Dialog also sets `deferPointerDownOutside: true` on itself.
        That means when the Dialog's detector decides a pointerdown looks
        "outside," it doesn't close immediately — it arms a ONE-TIME click
        listener and closes on the *next* click event instead. That's why
        the close happens "a moment later, on its own" right after picking
        a checkbox item, rather than instantly.

        FIX: set modal={false} on this DropdownMenu. Since it already lives
        inside the Dialog (which provides its own focus trap and pointer
        lock), the dropdown doesn't need a second, competing modal layer.
        With modal={false} there's only one modal context in play (the
        Dialog's), so there's nothing for it to misjudge.
      */}
      <DropdownMenu
        modal={false}
        onOpenChange={(open) => {
          // Returning focus to the trigger after close (for keyboard/
          // screen-reader users) without relying on Radix's built-in
          // onCloseAutoFocus, which we keep disabled below as a second
          // layer of protection against focus jumping outside the Dialog.
          if (!open) {
            requestAnimationFrame(() => triggerRef.current?.focus());
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            ref={triggerRef}
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between h-auto min-h-10 py-2 px-3"
          >
            <div className="flex flex-wrap gap-1 items-center">
              {selected.length > 0 ? (
                selected.map((val) => {
                  const option = options.find((o) => o.value === val);
                  return (
                    <Badge
                      key={val}
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none flex items-center gap-1 pr-1"
                    >
                      {option?.label}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(val);
                        }}
                        className="hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto z-[100]"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {options.length === 0 ? (
            <div className="py-2 px-4 text-sm text-gray-500">
              No options found.
            </div>
          ) : (
            options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleSelect(option.value)}
                onSelect={(e) => e.preventDefault()} // Keep dropdown open after picking an item
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
