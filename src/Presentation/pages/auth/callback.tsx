// src/pages/auth/callback.tsx
import { useEffect } from "react";

export default function AuthCallback() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            alert("Authorization code missing.");
            window.location.href = "/login";
            return;
        }

        fetch("https://localhost:7176/api/auth/microsoft-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Token exchange failed");
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("userId", data.userId);
                window.location.href = "/dashboard";
            })
            .catch((err) => {
                console.error("Login error:", err);
                window.location.href = "/login";
            });
    }, []);

    return <div>Signing you in...</div>;
}