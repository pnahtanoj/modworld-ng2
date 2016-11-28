/* tslint:disable:no-unused-variable */

import {SoundFile} from './sound-file';

let defaultCurrentTime = 55555;
class MockAudioContext {
    currentTime = defaultCurrentTime;

    createBufferSource() { return null; };
    createGain() { return null; };
}

describe('SoundFile Model', () => {
    let sound;
    let context;

    beforeEach(() => {
        sound = new SoundFile();
        context = new MockAudioContext();
        sound.setContext(context);
    });

    it('should exist with defaults ', () => {
        expect(sound).toBeTruthy();
        expect(sound.volume).toBe(1);
    });

    it('setContext should do so', () => {
        expect(sound.context).toBe(context);
    })

    describe('setVolume', () => {
        it('should limit values < 0 && > 1', () => {
            sound.setVolume(-1);
            expect(sound.volume).toBe(0);
            sound.setVolume(2);
            expect(sound.volume).toBe(1);
        })

        it('should set legal values', () => {
            sound.setVolume(0.45);
            expect(sound.volume).toBe(0.45);
        })
    })

    // NEED BACKEND MOCK STUFF //
    // describe('loadFile', () => {
    //     it('should get buffer', inject([XHRBackend], (mockBackend) => {
    //
    //
    //     }))
    // })

    describe('play', () => {
        let player, gain;

        beforeEach(() => {
            player = {
                buffer: '',
                connect: (dest) => {},
                start: (time) => {}
            };
            gain = {
                gain: {
                    value: 0
                },
                connect: () => {}
            };

            spyOn(context, 'createBufferSource').and.callFake(() => player);
            spyOn(context, 'createGain').and.callFake(() => gain);
            spyOn(player, 'connect').and.callFake(() => gain);
            spyOn(player, 'start').and.callFake(() => gain);
            spyOn(gain, 'connect').and.callFake(() => gain);
        })

        it('should call nothing if no buffer', () => {
            sound.play();
            expect(context.createBufferSource).not.toHaveBeenCalled();
            expect(context.createGain).not.toHaveBeenCalled();
        });

        it('should perform play if buffer provided', () => {
            sound.buffer = 'SOMETHING';
            sound.play(12345);

            expect(context.createBufferSource).toHaveBeenCalled();
            expect(context.createGain).toHaveBeenCalled();
            expect(gain.gain.value).toBe(1);
            expect(player.buffer).toBe('SOMETHING');
            expect(player.connect).toHaveBeenCalledWith(gain);
            expect(gain.connect).toHaveBeenCalledWith(context.destination);
            expect(player.start).toHaveBeenCalledWith(12345);
        })

        it('should play current time if none provided', () => {
            sound.buffer = 'SOMETHING';
            sound.play();
            expect(player.start).toHaveBeenCalledWith(defaultCurrentTime);
        })
    })
});
