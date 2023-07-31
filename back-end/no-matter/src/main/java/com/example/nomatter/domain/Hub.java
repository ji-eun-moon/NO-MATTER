package com.example.nomatter.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "hubs")
public class Hub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hubId;

    private String hubUuid;
    private String location;
    private String weatherKey;

    @Override
    public String toString() {
        return "Hub{" +
                "hubId=" + hubId +
                ", hubUuid='" + hubUuid + '\'' +
                ", location='" + location + '\'' +
                ", weatherKey='" + weatherKey + '\'' +
                '}';
    }
}
