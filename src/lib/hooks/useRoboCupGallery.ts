"use client";

import { useEffect, useState } from "react";
import { Image } from "sanity";

import { RoboCupGalleryItem } from "../models";
import { client } from "../sanity/lib/client";
import { urlForImage } from "../sanity/lib/image";

export default function useRoboCupGallery(): RoboCupGalleryItem[] {
	const [galleryItems, setGalleryItems] = useState<RoboCupGalleryItem[]>([]);

	useEffect(() => {
		async function fetchGalleryItems(): Promise<void> {
			const query = `*[_type == "roboCupGalleryItem"] | order(order asc)`;
			const results = await client.fetch<(Omit<RoboCupGalleryItem, "image"> & { image: Image })[]>(query);
			const processedItems = results.map((result) => ({
				...result,
				image: urlForImage(result.image),
			}));
			setGalleryItems(processedItems);
		}

		void fetchGalleryItems();
	}, []);

	return galleryItems;
}
