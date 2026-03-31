import { Dexie, EntityTable } from 'dexie';

export interface Workspace {
    id: string;
    name: string;
    slug: string;
    description: string;
    tin: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
}

let browserDatabase: Dexie | null = null;

export function getDatabase() {
    if (!browserDatabase) browserDatabase = new Dexie('yimall') as Dexie & {
        workspaces: EntityTable<Workspace, 'id'>;
    };

    browserDatabase.version(1).stores({
        workspaces: 'id,slug',
    });

    browserDatabase.open();

    return browserDatabase;
}
