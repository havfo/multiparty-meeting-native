const electron = window.require('electron');

export default class ScreenShare
{
	constructor()
	{
		this._stream = null;
	}

	start()
	{
		return Promise.resolve()
			.then(() =>
			{
				return electron.desktopCapturer.getSources({ types: [ 'window', 'screen' ] });
			})
			.then((sources) =>
			{
				for (const source of sources)
				{
					// Currently only getting whole screen
					if (source.name === 'Entire Screen')
					{
						return navigator.mediaDevices.getUserMedia({
							audio : false,
							video :
							{
								mandatory :
								{
									chromeMediaSource   : 'desktop',
									chromeMediaSourceId : source.id
								}
							}
						});
					}
				}
			})
			.then((stream) =>
			{
				this._stream = stream;

				return stream;
			});
	}

	stop()
	{
		if (this._stream instanceof MediaStream === false)
		{
			return;
		}

		this._stream.getTracks().forEach((track) => track.stop());
		this._stream = null;
	}

	isScreenShareAvailable()
	{
		return true;
	}
}
