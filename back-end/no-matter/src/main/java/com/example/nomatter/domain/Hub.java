package com.example.nomatter.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "hubs")
public class Hub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hubId;

    private String hubUuid;
    private String location;
    private String weatherKey;
    private String inviteCode;
    private LocalDateTime codeExpiredTime;

}
