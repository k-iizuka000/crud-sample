package com.example.demo.test.backend;

import com.example.demo.backend.controller.DepartmentController;
import com.example.demo.backend.model.Department;
import com.example.demo.backend.service.DepartmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class DepartmentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private DepartmentService departmentService;

    @InjectMocks
    private DepartmentController departmentController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(departmentController).build();
    }

    @Test
    public void testGetAllDepartments() throws Exception {
        Department dept1 = new Department(1L, "IT部門");
        Department dept2 = new Department(2L, "営業部門");
        List<Department> departments = Arrays.asList(dept1, dept2);

        when(departmentService.getAllDepartments()).thenReturn(departments);

        mockMvc.perform(get("/api/departments")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("IT部門")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("営業部門")));

        verify(departmentService, times(1)).getAllDepartments();
    }

    @Test
    public void testGetDepartmentById() throws Exception {
        Department dept = new Department(1L, "IT部門");

        when(departmentService.getDepartmentById(1L)).thenReturn(dept);

        mockMvc.perform(get("/api/departments/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("IT部門")));

        verify(departmentService, times(1)).getDepartmentById(1L);
    }

    @Test
    public void testCreateDepartment() throws Exception {
        Department dept = new Department(null, "新部門");
        Department savedDept = new Department(3L, "新部門");

        when(departmentService.createDepartment(any(Department.class))).thenReturn(savedDept);

        mockMvc.perform(post("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"新部門\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(3)))
                .andExpect(jsonPath("$.name", is("新部門")));

        verify(departmentService, times(1)).createDepartment(any(Department.class));
    }

    @Test
    public void testUpdateDepartment() throws Exception {
        Department updatedDept = new Department(1L, "更新IT部門");

        when(departmentService.updateDepartment(eq(1L), any(Department.class))).thenReturn(updatedDept);

        mockMvc.perform(put("/api/departments/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"更新IT部門\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("更新IT部門")));

        verify(departmentService, times(1)).updateDepartment(eq(1L), any(Department.class));
    }

    @Test
    public void testDeleteDepartment() throws Exception {
        doNothing().when(departmentService).deleteDepartment(1L);

        mockMvc.perform(delete("/api/departments/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(departmentService, times(1)).deleteDepartment(1L);
    }
};