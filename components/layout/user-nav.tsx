"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatarProfile } from "@/components/user-avatar-profile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserProfileType = {
  username: string,
  email: string,
  familyName: string,
  givenName: string,
  birthdate: string,
  coverImage: string
  gender: string,
  permission: string[]
  roles: string[]
  phoneNumber: string
  picture: string
}

export function UserNav() {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfileType>()

  useEffect(() => {
    fetch("/auth/me")
    .then(res => res.json())
    .then(json => {
      console.log("JSON:", json)
      setUserProfile(json)
    })
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatarProfile
            user={{
              imageUrl: userProfile?.picture,
              fullName: userProfile?.familyName + " " + userProfile?.givenName,
              emailAddresses: [{ emailAddress: userProfile?.email ?? "email@example.com" }],
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
                {userProfile?.familyName + " " + userProfile?.givenName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {userProfile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
            onClick={() => {
              window.location.href = "/logout"
            }}
            className="text-red-600 focus:text-red-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
