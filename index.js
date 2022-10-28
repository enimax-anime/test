let vidElem = document.querySelector("#vid");
let hls = new Hls();


hls.loadSource("https://cdn.discordapp.com/attachments/1018251990624641044/1035345035509633094/cote-ep-1-1080p.m3u8");


hls.attachMedia(vidElem);
hls.on(Hls.Events.MANIFEST_PARSED, function () {
    vidElem.play();
});