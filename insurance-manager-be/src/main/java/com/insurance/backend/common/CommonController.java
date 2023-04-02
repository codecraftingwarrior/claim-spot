package com.insurance.backend.common;

import com.insurance.backend.config.mail.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/common")
public class CommonController {
    public static final String websiteUrl = "http://localhost:4200";
    public static final String websiteLoginUrl = "http://localhost:4200/auth/login";
    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    @Autowired
    public CommonController(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
    }

    @PostMapping(path = "send-mail")
    public ResponseEntity<Map<String, Boolean>> senMail(@RequestBody Mail mail) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom("elahmadou.gueye@univ-thies.sn");
        helper.setTo(mail.getTo());
        helper.setSubject(mail.getObject());
        Context context = new Context();
        context.setVariable("content", mail.getContent());
        String html = templateEngine.process("common-mail", context);
        helper.setText(html, true);
        //message.setContent(mail.getContent(), "text/html");
        javaMailSender.send(message);

        Map<String, Boolean> response = new HashMap<>();
        response.put("sended", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
