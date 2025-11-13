"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { IconUser, IconLogout } from "@tabler/icons-react";

// Usage UI components you created
import { UsagePill } from "@/components/UsagePill";
import { UsageDropdownCard } from "@/components/UsageDropdownCard";

export function FloatingNavbar() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { logout, user } = useAuth();

  const getInitials = (fullName?: string) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const firstInitial = names[0]?.[0] || "";
    const lastInitial = names.length > 1 ? names[names.length - 1][0] : "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  // Derive usage numbers safely from your typed user object
  const subs = user?.subscriptionsDetails;
  const limits = subs?.currentPlan?.limits;
  const usage = subs?.currentUsage;
  
  const commitsUsed = usage?.totalCommits ?? 0;
  const commitsTotal = limits?.totalCommitReviews ?? 0;

  const reposUsed = Array.isArray(usage?.usedRepositories)
    ? usage!.usedRepositories.length
    : usage?.totalRepositories ?? 0;
  const reposTotal = limits?.repositories ?? 0;

  const contribUsed = Array.isArray(usage?.usedContributors)
    ? usage!.usedContributors.length
    : usage?.totalContributors ?? 0;
  const contribTotal = limits?.contributors ?? 0;

  return (
    <div className="fixed top-5 z-50 w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <NavbarButton as={Link} href="/login" variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton as={Link} href="/register" variant="primary">
                  Register
                </NavbarButton>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Compact usage pill (desktop only) */}
                {limits && usage && (
                  <UsagePill
                    commitsUsed={commitsUsed}
                    commitsTotal={commitsTotal}
                    reposUsed={reposUsed}
                    reposTotal={reposTotal}
                    contribUsed={contribUsed}
                    contribTotal={contribTotal}
                  />
                )}

                {/* Avatar + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-label="Toggle profile menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-white dark:text-black font-semibold cursor-pointer select-none"
                  >
                    {getInitials(user?.personalDetails?.fullName)}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg py-1 z-50 font-sans">
                      {/* Usage summary card */}
                      {limits && usage && (
                        <UsageDropdownCard
                          commitsUsed={commitsUsed}
                          commitsTotal={commitsTotal}
                          reposUsed={reposUsed}
                          reposTotal={reposTotal}
                          contribUsed={contribUsed}
                          contribTotal={contribTotal}
                        />
                      )}

                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <IconUser />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 cursor-pointer"
                      >
                        <IconLogout />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            {/* Mobile usage block */}
            {user && limits && usage && (
              <div className="mt-3 rounded-md border border-neutral-300 dark:border-neutral-700 p-3 text-sm text-neutral-800 dark:text-neutral-200">
                <div className="mb-2 font-medium">Usage</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Commits</span>
                    <span>
                      {commitsUsed}/{commitsTotal}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-1.5 rounded bg-neutral-800 dark:bg-white"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (commitsTotal ? commitsUsed / commitsTotal : 0) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Repositories</span>
                    <span>
                      {reposUsed}/{reposTotal}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-1.5 rounded bg-neutral-800 dark:bg-white"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (reposTotal ? reposUsed / reposTotal : 0) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Contributors</span>
                    <span>
                      {contribUsed}/{contribTotal}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-1.5 rounded bg-neutral-800 dark:bg-white"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (contribTotal ? contribUsed / contribTotal : 0) *
                              100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex w-full flex-col gap-4 pt-4 border-t border-neutral-300 dark:border-neutral-700">
              {!user ? (
                <>
                  <NavbarButton
                    href="/login"
                    as={Link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    href="/register"
                    as={Link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Register
                  </NavbarButton>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                  >
                    <IconUser />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                  >
                    <IconLogout />
                    Logout
                  </button>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
