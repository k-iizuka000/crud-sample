package com.example.crudbackend.dto;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String departmentName;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String email, String departmentName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.departmentName = departmentName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
