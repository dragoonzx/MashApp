var toWav = require('audiobuffer-to-wav')

export function make_download(abuffer: any, total_samples: any = 2) {
  const blob = new Blob([toWav(abuffer)], { type: "audio/wav" });

	var new_file = URL.createObjectURL(blob);

	const href = new_file;
	const name = 'my-mashup-' + Intl.DateTimeFormat('en-EN').format(Date.now());

  return {
    name,
    href,
  }
}