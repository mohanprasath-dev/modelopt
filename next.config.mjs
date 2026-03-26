/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	async headers() {
		return [
			{
				source: "/:path*\\.(ico|jpg|jpeg|png|svg|webp|avif|woff|woff2|ttf)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/(sitemap.xml|robots.txt)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
};

export default nextConfig;
