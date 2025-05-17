import "@/css/theme.css"
import "@/css/base.css"
import "@/css/typography.css"
import "@/css/post.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Multiplayer News",
	description: "A fake news website where anyone can post their own headline!",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	)
}
