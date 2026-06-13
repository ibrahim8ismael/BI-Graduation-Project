"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input as BaseInput } from "@/components/ui/input";
import { Button as BaseButton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

type MLCardProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  accent?: "teal" | "lavender" | "peach" | "mint";
  className?: string;
};

type FieldProps = {
  label: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

type ErrorBannerProps = {
  message?: string | null;
};

type ResultBadgeProps = {
  label?: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
};

const accentBorder: Record<string, string> = {
  teal: "border-l-brand-teal",
  lavender: "border-l-brand-lavender",
  peach: "border-l-brand-peach",
  mint: "border-l-brand-mint",
};

export function MLCard({
  title,
  description,
  children,
  accent,
  className,
}: MLCardProps) {
  return (
    <Card
      className={cn(
        "w-full border-l-4 shadow-sm",
        accent && accentBorder[accent],
        className,
      )}
    >
      <CardContent className="p-6">
        {title ? (
          <div className="mb-4 space-y-1">
            <h3 className="text-sm font-semibold text-ink">{title}</h3>
            {description ? (
              <p className="text-xs text-muted">{description}</p>
            ) : null}
          </div>
        ) : description ? (
          <div className="mb-4 space-y-1">
            <p className="text-xs text-muted">{description}</p>
          </div>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}

export function Field({ label, htmlFor, description, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-body-strong">
        {label}
      </Label>
      {children}
      {description ? (
        <p className="text-xs text-muted-soft">{description}</p>
      ) : null}
    </div>
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof BaseInput>
>(function Input(props, ref) {
  return <BaseInput ref={ref} {...props} />;
});

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof BaseButton>
>(function Button(props, ref) {
  return <BaseButton ref={ref} {...props} />;
});

export function LoadingButton({
  loading,
  children,
  ...props
}: React.ComponentProps<typeof BaseButton> & { loading?: boolean }) {
  return (
    <BaseButton disabled={loading} {...props}>
      {loading && (
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </BaseButton>
  );
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0">&#9888;</span>
        <span>{message}</span>
      </div>
    </div>
  );
}

export function ResultBadge({ label, variant = "secondary" }: ResultBadgeProps) {
  if (!label) return null;

  return (
    <Badge variant={variant} className="text-[10px] font-medium uppercase tracking-wider">
      {label}
    </Badge>
  );
}
