// @ts-check

/** http namespace @satisfies {(string | RegExp)[][]} */
export const http = [
	// function request
	[
		'function request(url: string, method: string, callback: any, headers?: any, post_data?: string, options?: any)',
		`function request(
			url: string,
			method: string,
			callback: (
			this: any,
			id: hash,
			response: { 
				status: number;
				response?: string;
				headers: { [key:string]: string };
				path?: string;
				url?: string;
				error?: string;
				bytes_received?: number;
				bytes_total?: number;
				range_start: number;
				range_end: number;
				document_size: number;
			}
		) => void,
		 headers?: { [key:string]: string },
		 post_data?: string,
		 options?: {
			timeout?: number,
			path?: string,
			ignore_cache?: boolean,
			chunked_transfer?: boolean
			report_progress?: boolean
		 }
		 )`,
	],
];
