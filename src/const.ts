import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export const SrcDir = path.dirname(__filename);
export const RootDir = path.join(SrcDir, '..');

export const Port = Number(process.env.PORT) || 3000;
export const BaseUrl = process.env.BASE_URL || 'http://localhost';
export const BaseUrlWithPort = `${BaseUrl}:${Port}`;

export const MaxUploadSize = 5 * 1024 * 1024;
