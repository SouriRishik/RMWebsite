"use client";

import { useEffect, useState } from "react";

import { RoboCupGalleryItem } from "../models";
import { client } from "../sanity/lib/client";

export default function useRoboCupGallery(): RoboCupGalleryItem[] {
	const [galleryItems, setGalleryItems] = useState<RoboCupGalleryItem[]>([]);

	useEffect(() => {
		async function fetchGalleryItems(): Promise<void> {
			const query = `*[_type == "roboCupGalleryItem"] | order(order asc) {
				...,
				image { asset { url } }
			}`;
			const results = await client.fetch<RoboCupGalleryItem[]>(query);
			setGalleryItems(results);
		}

		void fetchGalleryItems();
	}, []);

	return galleryItems;
}
