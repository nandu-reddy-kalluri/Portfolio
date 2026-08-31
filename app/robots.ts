import type { MetadataRoute } from "next";

const SITE_URL = "https://github.com/nandu-reddy-kalluri";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
