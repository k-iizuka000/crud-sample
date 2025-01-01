package com.example.crudbackend.repository;

import com.example.crudbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Find users by department ID
    List<User> findByDepartmentId(Long departmentId);
}
