export interface Video{
    [name: string]: {
        src: string,
        video?: MediaElementAudioSourceNode,
        filters: {
            [filter_name: string]: string
        }
    }
}