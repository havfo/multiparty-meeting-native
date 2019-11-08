export function getSignalingUrl(peerId, roomId)
{
	const port = window.config.port;

	const url = `wss://${window.config.multipartyServer}:${port}/?peerId=${peerId}&roomId=${roomId}`;

	return url;
}
