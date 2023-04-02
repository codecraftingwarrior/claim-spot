package com.insurance.backend.config.mail;

public class Mail {
    private String to;
    private String object;
    private String content;

    public Mail() {
    }

    public Mail(String to, String object, String content) {
        this.to = to;
        this.object = object;
        this.content = content;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
