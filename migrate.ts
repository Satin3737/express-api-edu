import {MongoUrl} from '@/database/db';

export default {
    uri: MongoUrl,
    migrationsPath: './src/database/migrations',
    templatePath: './src/database/template.ts',
    autosync: true
};
