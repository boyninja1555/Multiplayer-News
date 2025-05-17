"use client"

import "@/css/live-feed.css"
import type ApiResponse from "@/types/api-response"
import React, { useEffect, useState, useRef, ChangeEventHandler } from "react"

export default function Home() {
	const [headlines, setHeadlines] = useState<string[]>(["Loading…"])
	const fetchRef = useRef<number>(0)

	useEffect(() => {
		const fetchHeadline = async () => {
			try {
				const res = await fetch("/api/headline")
				const { status, data: headline } = (await res.json()) as ApiResponse

				if (status && typeof headline === "string") {
					fetchRef.current += 1
					setHeadlines([headline])
				}
			} catch {
			}
		}

		fetchHeadline()
		const id = setInterval(fetchHeadline, 5000)
		return () => clearInterval(id)
	}, [])

	const [formStatus, setFormStatus] = useState(false)
	const [formMessage, setFormMessage] = useState<string | null>(null)
	const [formTextLength, setFormTextLength] = useState(0)

	function onFormSubmit(event: React.FormEvent) {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const headline = (form.elements.namedItem("headline") as HTMLInputElement).value

		async function updateHeadline() {
			try {
				const resObj = await fetch("/api/headline", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						headline,
					}),
				})
				const res = await resObj.json() as ApiResponse
				setFormStatus(res.status)
				setFormMessage(res.message || null)
			} catch (e) {
				setFormStatus(false)
				setFormMessage("The headline could not be set! The API is down.")
			}
		}
		updateHeadline()
	}

	function onFormUpdate(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement
		setFormTextLength(input.value.length)
	}

	const contentA = headlines
	const contentB = headlines

	return (
		<div className="mt-[5rem] mx-auto px-[1rem] max-w-[585px]">
			<h1 className="text-center">Multiplayer <em>News</em></h1>
			<p className="text-center">
				A fake news website where <em>anyone</em> can post their own headline!
			</p>

			<div className="my-[2rem] p-[1rem] bg-theme rounded-[.5rem] text-foreground-theme w-full">
				<pre>live_feed.exe</pre>

				<div className="ticker-container">
					<div className="ticker">
						{[...contentA, ...contentB].map((text, i) => (
							<span key={i} className="ticker-item">{text}</span>
						))}
					</div>
				</div>
			</div>

			<h2 className="text-center">Set Headline</h2>
			<form onSubmit={onFormSubmit}>
				<div className="form-part">
					<span className="form-part-lbl">New Headline</span>
					<span className="form-part-desc">The new headline you want</span>
					<input type="text" name="headline" onChange={onFormUpdate} />
					
					<p><em>{formTextLength}</em> Characters</p>
				</div>

				<span className={formStatus ? "text-green-500" : "text-red-500"}>{formMessage}</span>

				<input type="submit" value="Set!" />
			</form>
		</div>
	)
}
