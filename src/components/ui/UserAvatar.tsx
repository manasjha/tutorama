"use client";

import { useState } from "react";

import { cn } from "@/lib/utils/cn";

type UserAvatarProps = {
  avatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
  className?: string;
};

function getInitials(displayName?: string | null, email?: string | null) {
  const nameParts = displayName
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (nameParts?.length) {
    return nameParts.map((part) => part[0]).join("").toUpperCase();
  }

  return (email?.trim()[0] ?? "T").toUpperCase();
}

export function UserAvatar({
  avatarUrl,
  className,
  displayName,
  email,
}: UserAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getInitials(displayName, email);
  const showImage = Boolean(avatarUrl && !imageFailed);

  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-trust-blue text-xs font-semibold text-white ring-1 ring-border-soft",
        className,
      )}
    >
      {showImage ? (
        // Google profile image hosts vary, so a regular image keeps this robust.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="size-full object-cover"
          onError={() => setImageFailed(true)}
          referrerPolicy="no-referrer"
          src={avatarUrl ?? undefined}
        />
      ) : (
        initials
      )}
    </span>
  );
}
