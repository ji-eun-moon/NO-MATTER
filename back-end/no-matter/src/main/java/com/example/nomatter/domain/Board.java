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
@Table(name = "board")
@ToString
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    private Long userId;
    private Long remoteId;
    private Long download;
    private LocalDateTime createDate;

}
