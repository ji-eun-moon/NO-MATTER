package com.example.nomatter.domain.hubdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HubRegisterDto {

    private String hubUuid;
    private String weatherKey;
    private String location;
    private String userHubAuth;
    private String userHubName;

}
