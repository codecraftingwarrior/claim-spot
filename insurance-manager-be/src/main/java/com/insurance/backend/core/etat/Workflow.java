package com.insurance.backend.core.etat;

public enum Workflow {
    AWAITING_VALIDATION("AV"),
    AWAITING_PICS("AP"),
    AWAITING_EXPERTISE("AEX"),
    FENCED("CL");

    private final String stateCode;

    Workflow(String stateCode) {
        this.stateCode = stateCode;
    }

    public String getStateCode() {
        return stateCode;
    }
}
