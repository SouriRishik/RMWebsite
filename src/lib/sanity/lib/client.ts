import { createClient } from "next-sanity";

import { apiVersion, dataset, previewDrafts, projectId, token, useCdn } from "../env";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
});

export const previewClient = previewDrafts
	? createClient({
			apiVersion,
			dataset,
			projectId,
			useCdn: false,
			perspective: "previewDrafts",
			token,
	  })
	: client;
