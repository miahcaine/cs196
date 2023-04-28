import { v4 as uuidv4 } from 'uuid';

// make functions to fetch user data
export let userSoundsData = [
    {
        soundId: 0,
        path: "my-app/src/sounds/clap (1).wav",
        duration: 1,
        color: 'red',
        clickedClass: "unclicked-sound"
    },
    {
        soundId: 1,
        path: "my-app/src/sounds/bass (1).wav",
        duration: 1,
        color: 'blue',
        clickedClass: "unclicked-sound"
    },
    {
        soundId: 2,
        path: "my-app/src/sounds/hi hat (1).WAV",
        duration: 1,
        color: 'blue',
        clickedClass: "unclicked-sound"
    },
    {
        soundId: 3,
        path: "my-app/src/sounds/hi hat (1).WAV",
        duration: 1,
        color: 'blue',
        clickedClass: "unclicked-sound"
    }
]

export let tracksData = [
    {
        trackId: uuidv4(),
        items: userSoundsData
    }
]

// may need to put clickStack here??