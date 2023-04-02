package com.insurance.backend.core.audit;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable<T> {

    @CreatedBy
    @Column(name = "created_by")
    private T createdBy;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @LastModifiedBy
    @Column(name = "updated_by")
    private T updatedBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    protected T getCreatedBy() {
        return createdBy;
    }

    protected void setCreatedBy(T createdBy) {
        this.createdBy = createdBy;
    }

    protected Date getCreatedAt() {
        return createdAt;
    }

    protected void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    protected T getUpdatedBy() {
        return updatedBy;
    }

    protected void setUpdatedBy(T updatedBy) {
        this.updatedBy = updatedBy;
    }

    protected Date getUpdatedAt() {
        return updatedAt;
    }

    protected void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
