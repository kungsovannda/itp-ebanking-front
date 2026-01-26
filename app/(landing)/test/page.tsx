"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [account, setAccount] = useState<{ data: string }>();
  useEffect(() => {
    const fetcher = async () => {
      fetch("/account/public/test")
        .then((response) => response.json())
        .then((data) => setAccount(data));
    };

    fetcher();
  }, []);

  return (
    <div className="font-semi-bold text-2xl text-blue-500">{account?.data}</div>
  );
}
