import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export const SrcDir = path.dirname(__filename);
export const RootDir = path.join(SrcDir, '..');
export const StorageDir = 'storage';
export const ImagesDir = 'images';
export const ImagesStorageDir = `${StorageDir}/${ImagesDir}`;

export const Port = Number(process.env.PORT) || 3000;
export const BaseUrl = process.env.BASE_URL || 'http://localhost';
export const BaseUrlWithPort = `${BaseUrl}:${Port}`;

export const MaxUploadSize = 5 * 1024 * 1024;
export const MaxBodySize = 1024 * 1024 + MaxUploadSize;

export const PaginationPageDefault = 1;
export const PaginationLimitDefault = 10;
export const PaginationLimitMax = 100;

export const bcryptSalt = 12;
export const JwtSecret = process.env.JWT_SECRET || 'secret';
export const JwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 60 * 1000;
