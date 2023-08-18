package com.example.nomatter.domain;

import lombok.*;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import javax.persistence.*;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "routine")
@ToString
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routineId;

    private Long hubId;
    private String attributes;

}
