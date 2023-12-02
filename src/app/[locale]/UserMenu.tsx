"use client";

import { useReducer } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import type { Translations } from "@/translations/en";

interface UserMenuProps {
  session: Session | null;
  translations: Translations["Navigation"];
}

export default function UserMenu({ session, translations }: UserMenuProps) {
  const [isOpen, toggleOpen] = useReducer((isOpen) => !isOpen, false);

  if (!session?.user) {
    return (
      <button onClick={() => signIn("kompassi")} className="nav-link btn btn-link">
        {translations.logIn}
      </button>
    );
  }

  return (
    <div className="nav-item dropdown">
      <button
        className="nav-link btn btn-link dropdown-toggle"
        id="user-menu"
        role="button"
        aria-expanded={isOpen}
        onClick={toggleOpen}
      >
        {session.user.name}
      </button>
      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? "show": ""}`} aria-labelledby="user-menu">
        <li>
          <button className="dropdown-item" onClick={() => signOut()}>
            {translations.logOut}
          </button>
        </li>
      </ul>
    </div>
  );
}