export default function formatDate(millis) {
	const d = new Date(millis);
	return d.toLocaleDateString('en-GB', {
		year: '2-digit',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
}
