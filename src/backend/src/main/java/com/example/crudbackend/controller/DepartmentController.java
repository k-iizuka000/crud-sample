package com.example.crudbackend.controller;

import com.example.crudbackend.model.Department;
import com.example.crudbackend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:80", allowCredentials = "true")
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // 全部署取得
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = departmentService.findAll();
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(departments);
    }

    // 特定IDの部署取得
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
        Optional<Department> department = departmentService.findById(id);
        if (department.isPresent()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(department.get());
        } else {
            throw new RuntimeException("部署が見つかりません。");
        }
    }

    // 新規部署作成
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        if (department.getDepartmentCode() == null || department.getDepartmentCode().isEmpty()) {
            throw new RuntimeException("部署コードは必須です。");
        }

        Optional<Department> existingDepartment = departmentService.findByDepartmentCode(department.getDepartmentCode());
        if (existingDepartment.isPresent()) {
            throw new RuntimeException("既に存在する部署コードです。");
        }

        Department createdDepartment = departmentService.save(department);
        return ResponseEntity.status(201)
                .contentType(MediaType.APPLICATION_JSON)
                .body(createdDepartment);
    }

    // 部署更新
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable Integer id,
            @RequestBody Department departmentDetails) {

        Department updatedDepartment = departmentService.update(id, departmentDetails);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(updatedDepartment);
    }

    // 部署削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
        departmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
