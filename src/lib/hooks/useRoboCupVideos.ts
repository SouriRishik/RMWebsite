"use client";

import { useEffect, useState } from "react";

import { RoboCupVideo } from "../models";
import { client } from "../sanity/lib/client";

export default function useRoboCupVideos(): RoboCupVideo[] {
	const [videos, setVideos] = useState<RoboCupVideo[]>([]);

	useEffect(() => {
		async function fetchVideos(): Promise<void> {
			const query = `*[_type == "roboCupVideo"] | order(order asc)`;
			const results = await client.fetch<RoboCupVideo[]>(query);
			setVideos(results);
		}

		void fetchVideos();
	}, []);

	return videos;
}
