"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Calendar, Shield, Users } from "lucide-react";

type UserProfileType = {
  username: string;
  email: string;
  familyName: string;
  givenName: string;
  birthdate: string;
  coverImage: string;
  gender: string;
  permission: string[];
  roles: string[];
  phoneNumber: string;
  picture: string;
};

export default function Page() {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/auth/me")
        .then((res) => res.json())
        .then((json) => {
          console.log("JSON:", json);
          setUserProfile(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-lg text-slate-600">Loading profile...</div>
        </div>
    );
  }

  if (!userProfile) {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-lg text-slate-600">No profile data available</div>
        </div>
    );
  }

  const getInitials = () => {
    return `${userProfile.givenName?.[0] || ""}${userProfile.familyName?.[0] || ""}`.toUpperCase();
  };

  return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        {/* Cover Image */}
        <div
            className="h-80 w-full bg-red-600"
            style={{
              backgroundImage: userProfile.coverImage
                  ? `url(${userProfile.coverImage})`
                  : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-12">
          {/* Profile Header Card */}
          <Card className="mb-6 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={userProfile.picture} alt={userProfile.username} />
                  <AvatarFallback className="text-3xl font-semibold bg-linear-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {userProfile.givenName} {userProfile.familyName}
                  </h1>
                  <p className="text-lg text-slate-600 mt-1">@{userProfile.username}</p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    {userProfile.roles?.map((role, index) => (
                        <Badge key={index} variant="default" className="bg-blue-500 hover:bg-blue-600">
                          {role}
                        </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Email</p>
                    <p className="text-sm text-slate-600">{userProfile.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Phone Number</p>
                    <p className="text-sm text-slate-600">
                      {userProfile.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Birth Date</p>
                    <p className="text-sm text-slate-600">
                      {userProfile.birthdate
                          ? new Date(userProfile.birthdate).toLocaleDateString()
                          : "Not provided"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Gender</p>
                    <p className="text-sm text-slate-600 capitalize">
                      {userProfile.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions & Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permissions & Access
                </CardTitle>
                <CardDescription>Your account privileges and roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">Roles</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.roles?.length > 0 ? (
                        userProfile.roles.map((role, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                              {role}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">No roles assigned</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.permission?.length > 0 ? (
                        userProfile.permission.map((perm, index) => (
                            <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                              {perm}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">No specific permissions</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}