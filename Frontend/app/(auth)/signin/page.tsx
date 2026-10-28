'use client'

import "@/app/style/auth.css"
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SigninPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const canSubmit = username.trim().length > 0 && password.length > 0 && !isLoading

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!canSubmit) return

        setIsLoading(true)
        setError(null)
        const response = await signIn("credentials", {
            username: username.trim(),
            password,
            redirect: false,
        })
        setIsLoading(false)

        if (response?.error) {
            setError("Username or password is incorrect")
            return
        }

        router.push("/")
        router.refresh()
    }

    return (
        <main className="signin-page">
            <section className="signin-shell signin-shell-simple" aria-label="Sign in">
                <div className="signin-form-panel">
                    <div className="signin-form-heading">
                        <h1>Sign In</h1>
                    </div>
                    <form className="signin-form" onSubmit={handleSubmit}>
                        <div className="signin-input-group">
                            <UserRound aria-hidden="true" />
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                placeholder=" "
                                autoComplete="username"
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                    setError(null)
                                }}
                            />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div className="signin-input-group signin-password-group">
                            <LockKeyhole aria-hidden="true" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                placeholder=" "
                                autoComplete="current-password"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    setError(null)
                                }}
                            />
                            <label htmlFor="password">Password</label>
                            <button
                                type="button"
                                className="signin-password-toggle"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((current) => !current)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        {error ? <p className="signin-error" role="alert">{error}</p> : null}

                        <button type="submit" className="signin-submit" disabled={!canSubmit}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
