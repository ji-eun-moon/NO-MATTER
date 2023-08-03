package com.example.nomatter.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "remote")
@ToString
public class Remote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long controllerId;

    private Long productId;
    private Long usersHubsId;
    private String controllerName;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private boolean isOpened;

}
