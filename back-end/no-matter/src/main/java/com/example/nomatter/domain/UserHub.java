package com.example.nomatter.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@Table(name = "usershubs")
@ToString
public class UserHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_hubs_id")
    private Long usersHubsId;

    private Long hubId;
    private Long userId;
    private String userHubAuth;
    private String userHubName;
}
