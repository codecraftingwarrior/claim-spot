package com.insurance.backend.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@Service
public class CommonService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public CommonService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public Map<String, Boolean> sendMail(String to, String object, String content) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("elahmadou.gueye@univ-thies.sn");
        helper.setTo(to);
        helper.setSubject(object);
        message.setContent(content, "text/html");
        javaMailSender.send(message);

        Map<String, Boolean> response = new HashMap<>();
        response.put("sended", Boolean.TRUE);
        return response;
    }
}
