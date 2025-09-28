export interface VideoResponse {
    page: number;
    per_page: number;
    videos: PexelVideo[];
    total_results: number;
    next_page: string;
    url: string;
}

export interface PexelVideo {
    id: number;
    width: number;
    height: number;
    duration: number;
    full_res: null;
    tags: string[];
    url: string;
    image: string;
    avg_color: null;
    user: User;
    video_files: VideoFile[];
    video_pictures: VideoPicture[];
}

export interface User {
    id: number;
    name: string;
    url: string;
}

export interface VideoFile {
    id: number;
    quality: Quality;
    file_type: FileType;
    width: number;
    height: number;
    fps: number;
    link: string;
    size: number;
}

export enum FileType {
    VideoMp4 = "video/mp4",
}

export enum Quality {
    HD = "hd",
    SD = "sd",
    Uhd = "uhd",
}

export interface VideoPicture {
    id: number;
    nr: number;
    picture: string;
}
