/**
 * Insert API links
 * @param {string} data
 * @returns string
 */
export function getApiDocLinks(data) {
	// Find all blocks that start with `declare namespace`
	const regex = /declare namespace ([^ ]+)\s*\{((?:[^{}]|(?:\{[^{}]*\}))*)\}/g;
	const separator = '.';
	const apiUrl = 'https://defold.com/ref/stable';

	return data.replace(regex, (_match, namespaceName, namespaceContents) => {
		if (namespaceName === 'jit' || namespaceName === 'socket') {
			// Skip `jit` namespace since it has no Defold API links
			// Skip `socket` namespace since it does not follow a predictable naming pattern
			return `declare namespace ${namespaceName} {${namespaceContents}}`;
		}

		// Within each namespace block, find all `export function` declarations with a comment on the previous line
		const functionRegex = /^\s+(\*\/)\n\s*export function ([^(]+)\(/gm;
		const functionMatches = [];
		let match;
		while ((match = functionRegex.exec(namespaceContents))) {
			functionMatches.push({
				functionName: match[2],
				index: match.index,
			});
		}

		// Reorder functionMatches so that the objects with the higher index are ordered first
		// This is necessary to prevent our insert-at-slice logic from inserting at the wrong position
		functionMatches.sort((a, b) => b.index - a.index);

		// Insert API links
		functionMatches.forEach(({ functionName, index }) => {
			const newComment = `* @see {@link ${apiUrl}/${namespaceName}/#${namespaceName}${separator}${functionName}|API Documentation}\n`;
			namespaceContents =
				namespaceContents.slice(0, index) +
				newComment +
				namespaceContents.slice(index);
		});

		return `declare namespace ${namespaceName} {${namespaceContents}}`;
	});
}
