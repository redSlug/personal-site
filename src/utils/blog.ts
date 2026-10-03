import { getCollection, type CollectionEntry } from "astro:content";

export async function getBlogPosts(): Promise<CollectionEntry<"blog">[]> {
    const posts = await getCollection("blog", ({ data }) =>
        import.meta.env.PROD ? !data.draft : true
    );
    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
