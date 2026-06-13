"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input as BaseInput } from "@/components/ui/input";
import { Button as BaseButton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MLCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
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
};

export function MLCard({
  title,
  description,
  children,
  footer,
  className,
}: MLCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}

export function Field({ label, htmlFor, description, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {description ? (
        <p className="text-xs text-muted-foreground">{description}</p>
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

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </div>
  );
}

export function ResultBadge({ label }: ResultBadgeProps) {
  if (!label) {
    return null;
  }

  return (
    <Badge variant="secondary" className="text-xs">
      {label}
    </Badge>
  );
}
