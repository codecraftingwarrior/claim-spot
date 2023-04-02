export class EntityPermission {
    entityCode: string;
    entityName: string;
    isViewAllPermitted: boolean;
    isWritePermitted: boolean;
    isDeletePermitted: boolean;
    isViewOnePermitted: boolean;

    allPermitted?: boolean;
}