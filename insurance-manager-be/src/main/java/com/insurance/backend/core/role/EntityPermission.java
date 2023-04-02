package com.insurance.backend.core.role;


public class EntityPermission {
    private String entityCode;
    private String entityName;
    private Boolean isViewAllPermitted;
    private Boolean isWritePermitted;
    private Boolean isDeletePermitted;
    private Boolean isViewOnePermitted;

    public EntityPermission() {}

    public EntityPermission(String entityCode, String entityName) {
        this.entityCode = entityCode;
        this.entityName = entityName;
        this.isViewAllPermitted =
                this.isWritePermitted =
                        this.isDeletePermitted =
                                this.isViewOnePermitted = false;
    }

    public String getEntityCode() {
        return entityCode;
    }

    public String getEntityName() {
        return entityName;
    }

    public Boolean getIsViewAllPermitted() {
        return isViewAllPermitted;
    }

    public Boolean getIsWritePermitted() {
        return isWritePermitted;
    }

    public Boolean getIsDeletePermitted() {
        return isDeletePermitted;
    }

    public Boolean getIsViewOnePermitted() {
        return isViewOnePermitted;
    }

    public void setEntityCode(String entityCode) {
        this.entityCode = entityCode;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public void setIsViewAllPermitted(Boolean viewAllPermitted) {
        isViewAllPermitted = viewAllPermitted;
    }

    public void setIsWritePermitted(Boolean writePermitted) {
        isWritePermitted = writePermitted;
    }

    public void setIsDeletePermitted(Boolean deletePermitted) {
        isDeletePermitted = deletePermitted;
    }

    public void setIsViewOnePermitted(Boolean viewOnePermitted) {
        isViewOnePermitted = viewOnePermitted;
    }
}
