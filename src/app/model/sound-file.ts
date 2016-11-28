export class SoundFile {
    context: AudioContext;
    buffer: any;
    volume: number;
    file: string;

    constructor() {
        this.volume = 1;
    }

    setContext(context: AudioContext) {
        this.context = context;
        return this;
    }

    setVolume(vol: number) {
        if (vol < 0)
            vol = 0;
        if (vol > 1)
            vol = 1;

        this.volume = vol;
        return this;
    }
    loadFile(file) {
        let get = new XMLHttpRequest();
        get.open('get', file, true);
        get.responseType = 'arraybuffer';
        get.onload = () => {
            this.context.decodeAudioData(get.response, (buffer) => {
                this.buffer = buffer;
            })
        }
        get.send();

        this.file = file;
    }

    play(time?: number) {
        if (!this.buffer)
            return;

        let player = this.context.createBufferSource();
        let gain = this.context.createGain();

        gain.gain.value = this.volume;
        player.buffer = this.buffer;
        player.connect(gain);
        gain.connect(this.context.destination);
        player.start(time || this.context.currentTime);
    }
}
